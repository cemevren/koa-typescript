import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  Column,
} from 'typeorm';

import { Profile } from './Profile';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  identityId: string;

  @Column()
  Email: string;

  @OneToOne(() => Profile)
  @JoinColumn()
  Profile: Profile;
}
