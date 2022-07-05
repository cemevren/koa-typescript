import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Profiles {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  profileImage: string;
}
