import { Tribe } from "src/tribe/entities/tribe.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Organization {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "text",
    unique: true
  })
  name: string;

  @Column({
    type: "int"
  })
  status: number;

  @OneToMany(() => Tribe,
    tribe => tribe
  )
  tribes: Tribe[]
}
