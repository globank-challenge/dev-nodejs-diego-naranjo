import { Repository } from "src/repository/entities/repository.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Organization } from '../../organization/entities/organization.entity';

@Entity()
export class Tribe {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "text"
  })
  name: string;

  @Column({
    type: "int"
  })
  status: number;

  @ManyToOne(
    () => Organization,
    organization => organization.tribes
  )
  organization: Organization;

  @OneToMany(() => Repository,
    repository => repository.tribe
  )
  repository: Repository[]
}
