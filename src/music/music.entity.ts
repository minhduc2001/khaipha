import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { ERole } from '@/role/enum/roles.enum';
import { AbstractEntity } from '@/base/service/abstract-entity.service';
import { Permission } from '@/role/entities/permission.entity';
import { JoinTable } from 'typeorm';
import { EState } from '@shared/enum/common.enum';
import { Histories } from '@/histories/histories.entity';
import { Comments } from '@/comments/comments.entity';
import { Authors } from '@/authors/authors.entity';

@Entity()
export class Music extends AbstractEntity {
  @Column()
  title: string;

  @Column({ nullable: true })
  genre: string;

  @Column({ nullable: true })
  releaseDate: number;

  @Column({ nullable: true })
  artist: string;

  @Column({ nullable: true })
  duration: number;

  @Column({ nullable: true })
  album: string;

  @Column({ nullable: true })
  url: string;

  @Column({ nullable: true })
  image: string;

  @OneToMany(() => Histories, (history) => history.music)
  histories: Histories[];

  @OneToMany(() => Comments, (comment) => comment.music)
  comments: Comments[];

  @ManyToMany(() => Authors, (author) => author)
  @JoinTable()
  authors: Authors[];
}
