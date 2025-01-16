import { Module } from '@nestjs/common';
import { ReservasModule } from './reservas/reservas.module';

@Module({
  imports: [
    ReservasModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
