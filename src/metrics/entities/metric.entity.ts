import { Repository } from "src/repository/entities/repository.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Metric {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: "float8"
  })
  coverage: number;

  @Column({
    type: "int"
  })
  bugs: number;

  @Column({
    type: "int"
  })
  vulnerabilities: number;

  @Column({
    type: "int"
  })
  hotspots: number

  @Column({
    type: "int"
  })
  code_smells: number

  @OneToOne(() => Repository)
  @JoinColumn()
  repository: Repository
}
