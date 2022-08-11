import { Repository } from "src/repository/entities/repository.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Metric {
  @PrimaryColumn()
  repositoryId: number

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

  @OneToOne(() => Repository, { cascade: true })
  @JoinColumn()
  repository: Repository
}
