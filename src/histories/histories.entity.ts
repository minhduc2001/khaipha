import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { ERole } from '@/role/enum/roles.enum';
import { AbstractEntity } from '@/base/service/abstract-entity.service';
import { Permission } from '@/role/entities/permission.entity';
import { EState } from '@shared/enum/common.enum';
import { User } from '@/user/entities/user.entity';
import { JoinColumn } from 'typeorm';
import { Music } from '@/music/music.entity';

@Entity()
export class Histories extends AbstractEntity {
  @ManyToOne(() => User, (user) => user.histories)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Music, (music) => music.histories)
  @JoinColumn()
  music: Music;

  @Column({ nullable: true })
  position: number;

  @Column({ nullable: true })
  duration: number;
}
