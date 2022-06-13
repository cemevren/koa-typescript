import "reflect-metadata"
import { DataSource } from "typeorm"
import config from 'config';

const postgresConfig = config.get<{
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
}>('postgresConfig');

console.log(postgresConfig);

export const AppDataSource = new DataSource({
    type: "postgres",
    ...postgresConfig,
    synchronize: true,
    logging: false,
    entities: ['src/entities/**/*.entity{.ts,.js}'],
    migrations: ['src/migrations/**/*{.ts,.js}'],
    subscribers: ['src/subscribers/**/*{.ts,.js}'],
})
