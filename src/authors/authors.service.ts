import { Injectable } from '@nestjs/common';
import { BaseService } from '@base/service/base.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateConfig } from '@base/service/paginate/paginate';

import * as exc from '@base/api/exception.reslover';
import { Authors } from './authors.entity';
import { CreateAuthorDto, ListAuthorsDto, UpdateAuthorDto } from './author.dto';

@Injectable()
export class AuthorsService extends BaseService<Authors> {
  constructor(
    @InjectRepository(Authors)
    protected readonly repository: Repository<Authors>,
  ) {
    super(repository);
  }

  async getAllAuthors(query: ListAuthorsDto) {
    const config: PaginateConfig<Authors> = {
      searchableColumns: ['name'],
      sortableColumns: ['id'],
    };

    return this.listWithPage(query, config);
  }

  async getAuthorById(authorId: number) {
    const author = await this.repository.findOne({
      where: {
        id: authorId,
      },
    });

    return author;
  }

  async addAuthors(dto: CreateAuthorDto) {
    return await this.repository.save(dto);
  }

  async updateAuthors(dto: UpdateAuthorDto) {
    const author = await this.getAuthorById(dto.id);
    if (!author)
      throw new exc.BadException({ message: 'khong ton tai tac gia nay' });
    author.name = dto.name;
    author.birthday = dto.birthday;
    author.image = dto.image;
    author.description = dto.description;

    await author.save();
    return true;
  }

  async removeAuthors(authorsId: number[]) {
    for (let id in authorsId) {
      await this.repository.delete(id);
    }

    return true;
  }
}
