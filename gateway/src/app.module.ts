import { Module } from '@nestjs/common';
import { ReservasModule } from './reservas/reservas.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ReservasModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
