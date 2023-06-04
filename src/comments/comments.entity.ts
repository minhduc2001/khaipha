import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { ERole } from '@/role/enum/roles.enum';
import { AbstractEntity } from '@/base/service/abstract-entity.service';
import { Permission } from '@/role/entities/permission.entity';
import { JoinTable } from 'typeorm';
import { EState } from '@shared/enum/common.enum';
import { User } from '@/user/entities/user.entity';
import { JoinColumn } from 'typeorm';
import { Music } from '@/music/music.entity';

@Entity()
export class Comments extends AbstractEntity {
  @ManyToOne(() => User, (user) => user)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Music, (music) => music.comments)
  @JoinColumn()
  music: Music;

  @Column()
  content: string;
}
