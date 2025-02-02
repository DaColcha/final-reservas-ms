import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { envs } from './envs';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mssql',
  host: envs.dbHost,
  port: envs.dbPort,
  username: envs.dbUser,
  password: envs.dbPassword,
  database: envs.dbDatabase,
  autoLoadEntities: true,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};