import { Module } from '@nestjs/common';
import { ReservasModule } from './reservas/reservas.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envs } from './config';

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

    ReservasModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
