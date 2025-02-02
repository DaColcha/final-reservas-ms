import { Module } from '@nestjs/common';
import { ReservasModule } from './reservas/reservas.module';
import { AuthModule } from './auth/auth.module';
import { MenuModule } from './menu/menu.module';

@Module({
  imports: [ReservasModule, AuthModule, MenuModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
