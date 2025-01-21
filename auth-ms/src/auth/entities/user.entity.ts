import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  usuario: string;

  @Column('text', { select: false })
  contrasena: string;

  @Column('text')
  nombreCompleto: string;

  @Column('text', { default: ['client'] })
  rol: string;

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.usuario = this.usuario.toLowerCase().trim();
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.checkFieldsBeforeInsert();
  }
}
