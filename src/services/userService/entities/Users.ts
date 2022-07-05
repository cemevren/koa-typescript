import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { IsEmail, Min, Max } from 'class-validator';

import { Profiles } from './Profiles';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column()
  @Min(2)
  @Max(50)
  firstName: string;

  @Column()
  @Min(2)
  @Max(50)
  lastName: string;

  @OneToOne(() => Profiles, {
    cascade: true,
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn()
  profile: Profiles;
}
