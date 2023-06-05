import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from '@/base/service/abstract-entity.service';

@Entity()
export class Authors extends AbstractEntity {
  @Column()
  name: string;

  @Column()
  birthday: Date;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  description: string;
}
