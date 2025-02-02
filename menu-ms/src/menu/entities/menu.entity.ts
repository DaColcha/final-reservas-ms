import {Column, 
        Entity, 
        PrimaryGeneratedColumn
    } from "typeorm";

@Entity({name: 'TBL_MENU'})
export class Menu {

    @PrimaryGeneratedColumn('increment')
    ID_MENU: number;

    @Column({type: 'text'})
    NOMBRE: string;

    @Column({type: 'text'})
    DESCRIPCION: string;

    @Column({type: 'float'})
    PRECIO: number;

    @Column({type: 'text'})
    IMAGEN: string;
}
