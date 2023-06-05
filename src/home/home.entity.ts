import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '@base/service/abstract-entity.service';

@Entity()
export class Home extends AbstractEntity {
  @Column()
  type: string;

  @Column()
  name: string;

  @Column()
  ref: string;
}
