import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstractEntity } from '@/base/service/abstract-entity.service';
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

  @Column({ nullable: true })
  star: number;
}
