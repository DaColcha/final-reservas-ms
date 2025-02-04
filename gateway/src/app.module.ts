import { Module } from '@nestjs/common';
import { ReservasModule } from './reservas/reservas.module';
import { AuthModule } from './auth/auth.module';
import { MenuModule } from './menu/menu.module';
import { MensajesModule } from './mensajes/mensajes.module';

@Module({
  imports: [ReservasModule, AuthModule, MenuModule, MensajesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
