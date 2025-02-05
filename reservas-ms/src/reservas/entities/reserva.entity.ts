import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'reservas' })
export class Reserva {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  fecha: Date;

  @Column({ type: 'time' })
  hora: string;

  @Column({ type: 'int' })
  cantidadPersonas: number;

  @Column({ type: 'text' })
  observaciones: string;

  @Column({ type: 'text' })
  estado: string;

  @Column({ type: 'uuid' })
  usuario: string;

  @Column({ type: 'int' })
  mesa: number;
}
