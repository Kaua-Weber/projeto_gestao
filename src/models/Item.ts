import { BaseEntity, Column, Entity, ManyToOne, OneToMany, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { Categoria } from "./Categoria";


@Entity('itens')
export class Item extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public nome: string;

  @Column()
  public categoria_id: number;

  @ManyToOne(() => Categoria, (categoria) => categoria.itens)
  @JoinColumn({ name: 'categoria_id' })
  public categoria: Promise<Categoria>;
}