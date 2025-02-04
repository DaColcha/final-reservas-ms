import { Module } from '@nestjs/common';
import { MensajesGateway } from './mensajes.gateway';

@Module({
  providers: [MensajesGateway],
})
export class MensajesModule {}
