import { Tribe } from "src/tribe/entities/tribe.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Repository {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    length: 50
  })
  name: string;

  @Column({
    type: "varchar",
    length: 1
  })
  state: string[]

  @Column({
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP"
  })
  create_time: string;

  @Column({
    type: "varchar",
    length: 1
  })
  status: string[]

  @ManyToOne(() => Tribe,
    tribe => tribe.repository
  )
  tribe: Tribe

}
