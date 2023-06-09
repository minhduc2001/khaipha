import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { ERole } from '@/role/enum/roles.enum';
import { AbstractEntity } from '@/base/service/abstract-entity.service';
import { Permission } from '@/role/entities/permission.entity';
import { JoinTable } from 'typeorm';
import { EState } from '@shared/enum/common.enum';
import { Histories } from '@/histories/histories.entity';

@Entity()
export class User extends AbstractEntity {
  @Column({ nullable: false, unique: true })
  username: string;

  @Exclude({ toPlainOnly: true })
  @Column()
  password: string;

  @Column({ nullable: true, unique: true })
  phone: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  background: string;

  @Column({ nullable: false, type: 'enum', enum: ERole, default: ERole.Guest })
  role: ERole;

  @ManyToMany(() => Permission, (permission) => permission)
  @JoinTable()
  permissions: Permission[];

  @Column({ type: 'enum', enum: EState, default: EState.Active })
  state: EState;

  @OneToMany(() => Histories, (history) => history.user)
  histories: Histories[];

  setPassword(password: string) {
    this.password = bcrypt.hashSync(password, 10);
  }

  comparePassword(rawPassword: string): boolean {
    const userPassword = this.password;
    return bcrypt.compareSync(rawPassword, userPassword);
  }
}
