import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Identity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  /*
  @Column({ array: true, default: ['default'] })
  permissions: string[];
     */
}
