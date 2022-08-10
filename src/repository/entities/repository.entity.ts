import { Metric } from "src/metrics/entities/metric.entity";
import { Tribe } from "src/tribe/entities/tribe.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Repository {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "text"
  })
  name: string;

  @Column({
    type: "text",
  })
  state: string

  @Column({
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP"
  })
  create_time: string;

  @Column({
    type: "text",
  })
  status: string

  @ManyToOne(() => Tribe,
    tribe => tribe.repository
  )
  tribe: Tribe

}
