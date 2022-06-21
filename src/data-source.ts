import 'dotenv/config';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Identity } from './services/identityService/persistence/Identity.model';

const postgresConfig = {
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
};

console.log(postgresConfig);

export const AppDataSource = new DataSource({
  type: 'postgres',
  ...postgresConfig,
  synchronize: true,
  logging: true,
  entities: [Identity],
  migrations: ['src/migrations/**/*{.ts,.js}'],
  subscribers: ['src/subscribers/**/*{.ts,.js}'],
});
