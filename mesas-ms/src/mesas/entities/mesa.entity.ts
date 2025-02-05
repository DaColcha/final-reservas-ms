import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';

@Entity()
export class Mesa{

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: "int"})
    numeroPersonas: number;

    @Column({ type: "boolean"})
    disponible: boolean;

}