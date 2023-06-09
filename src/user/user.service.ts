import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// BASE
import * as exc from '@/base/api/exception.reslover';
import { LoggerService } from '@base/logger';
import { BaseService } from '@/base/service/base.service';

// APPS
import { User } from '@/user/entities/user.entity';
import {
  ICreateUser,
  IUserGetByUniqueKey,
} from '@/user/interfaces/user.interface';

import { ListUserDto, UploadAvatarDto } from './dtos/user.dto';
import { PaginateConfig } from '@base/service/paginate/paginate';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectRepository(User)
    protected readonly repository: Repository<User>,
    private readonly loggerService: LoggerService,
  ) {
    super(repository);
  }

  logger = this.loggerService.getLogger(UserService.name);

  getUserByUniqueKey(option: IUserGetByUniqueKey): Promise<User> {
    const findOption: Record<string, any>[] = Object.entries(option).map(
      ([key, value]) => ({ [key]: value }),
    );
    return this.repository
      .createQueryBuilder('user')
      .where(findOption)
      .getOne();
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.repository.findOne({ where: { username: username } });
  }

  async getUserById(id: number): Promise<User | undefined> {
    return this.repository.findOne({ where: { id: id } });
  }

  async createUser(data: ICreateUser) {
    try {
      const user: User = this.repository.create(data);
      user.setPassword(data.password);
      await user.save();

      return user;
    } catch (e) {
      this.logger.warn(e);
      throw new exc.BadException({ message: e.message });
    }
  }

  async getAllUser(query: ListUserDto) {
    const config: PaginateConfig<User> = {
      searchableColumns: ['username'],
      sortableColumns: ['id'],
    };

    return this.listWithPage(query, config);
  }

  async getAllUserWithoutPaging() {
    return this.repository.find();
  }

  async uploadAvatar(dto: UploadAvatarDto) {
    console.log(dto);
  }

  async checkPhoneNumberExists(phone: string) {
    try {
      const isExist = await this.getUserByUniqueKey({ phone: phone });
      if (isExist)
        throw new exc.BadRequest({
          message: 'Số điện thoại đã tồn tại',
          errorCode: 'PHONE_EXIST',
        });
      return;
    } catch (e) {
      // this.logger.warn(e);
      throw new exc.BadRequest({
        message: e.message,
        errorCode: e.response.errorCode,
      });
    }
  }
}
