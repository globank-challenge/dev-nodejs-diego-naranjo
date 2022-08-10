import { Tribe } from "src/tribe/entities/tribe.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Organization {


  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    unique: true,
    length: 50
  })
  name: string;

  @Column({
    type: "int"
  })
  status: number;

  @OneToMany(() => Tribe,
    tribe => tribe.organization
  )
  tribes: Tribe[]
}
