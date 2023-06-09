import { Injectable } from '@nestjs/common';
import { BaseService } from '@base/service/base.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateConfig } from '@base/service/paginate/paginate';

import * as exc from '@base/api/exception.reslover';
import { Authors } from './authors.entity';
import { CreateAuthorDto, ListAuthorsDto, UpdateAuthorDto } from './author.dto';
import { Music } from '@/music/music.entity';
import { UrlService } from '@base/helper/url.service';

@Injectable()
export class AuthorsService extends BaseService<Authors> {
  constructor(
    @InjectRepository(Authors)
    protected readonly repository: Repository<Authors>,
    private readonly urlService: UrlService,
  ) {
    super(repository);
  }

  async preResponse(authors: Authors[]) {
    for (const author of authors) {
      if (author?.image) author.image = this.urlService.uploadUrl(author.image);
    }
  }
  async getAllAuthors(query: ListAuthorsDto) {
    const config: PaginateConfig<Authors> = {
      searchableColumns: ['name'],
      sortableColumns: ['id'],
    };

    const data = await this.listWithPage(query, config);
    await this.preResponse(data.results);
    return data;
  }

  async getAuthorById(authorId: number) {
    const author = await this.repository.findOne({
      where: {
        id: authorId,
      },
    });
    await this.preResponse([author]);
    return author;
  }

  async addAuthors(dto: CreateAuthorDto) {
    return await this.repository.save(dto);
  }

  async updateAuthors(dto: UpdateAuthorDto) {
    const author = await this.getAuthorById(dto.id);
    if (!author)
      throw new exc.BadException({ message: 'khong ton tai tac gia nay' });
    author.name = dto.name ?? author.name;
    author.birthday = dto.birthday ?? author.birthday;
    author.image = dto.image ?? author.image;
    author.description = dto.description ?? author.description;

    await author.save();
    return true;
  }

  async removeAuthors(authorsId: number[]) {
    for (const id in authorsId) {
      await this.repository.delete(id);
    }

    return true;
  }
}
