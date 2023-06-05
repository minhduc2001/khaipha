import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as exc from '@base/api/exception.reslover';
import { UserService } from '@/user/user.service';
import { CheckPhoneDto, LoginDto, RegisterDto } from './dtos/auth.dto';
import { IJWTPayload, ITokens } from './interfaces/auth.interface';
import { config } from '@/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user && user.comparePassword(pass)) {
      delete user.password;
      return user;
    }
    return null;
  }

  async login(dto: LoginDto): Promise<any> {
    const { phone, password } = dto;
    const user = await this.userService.getUserByUniqueKey({ phone });
    if (!user || !user.comparePassword(password))
      throw new exc.BadRequest({
        message: 'phone or password does not exists',
      });
    const payload: IJWTPayload = {
      sub: user.id,
    };
    const accessToken = this.jwtService.sign(payload);

    return {
      ...user,
      accessToken: accessToken,
    };
  }

  async register(dto: RegisterDto) {
    const isExists = await this.userService.getUserByUniqueKey({
      phone: dto.phone,
    });

    if (isExists) throw new exc.BadRequest({ message: 'phone already is use' });
    const user = await this.userService.createUser({
      phone: dto.phone,
      password: dto.password,
    });
    const tokens: ITokens = await this.getTokens({ sub: user.id });
    return { accessToken: tokens.accessToken };
  }

  async getTokens(payload: IJWTPayload) {
    console.log(payload, 'payload');
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      secret: config.JWT_RT_SECRET,
      expiresIn: '7d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async checkPhoneExist(dto: CheckPhoneDto) {
    return this.userService.checkPhoneNumberExists(dto.phone);
  }
}
