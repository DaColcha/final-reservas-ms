import { Module } from '@nestjs/common';
import { MesasModule } from './mesas/mesas.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envs } from './config/envs';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: envs.dbHost,
      port: envs.dbPort,
      username: envs.dbUser,
      password: envs.dbPassword,
      database: envs.dbDatabase,
      synchronize: true,
      autoLoadEntities: true,
    }),

    MesasModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
