import { Repository, DataSource } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRepositoryDto } from './dto/create-repository.dto';
import { UpdateRepositoryDto } from './dto/update-repository.dto';
import { TribeDto } from './dto/tribe.dto';
import { Repository as Repo } from './entities/repository.entity';
import { Metric } from 'src/metrics/entities/metric.entity';
import { MockService } from 'src/mock/mock.service';

@Injectable()
export class RepositoryService {

  constructor(
    private readonly dataSource: DataSource,

    private readonly mockService: MockService
  ) { }

  create(createRepositoryDto: CreateRepositoryDto) {
    return 'This action adds a new repository';
  }

  async findAll(tribeDto: TribeDto) {
    const { tribe } = tribeDto;
    const metrics = await this.dataSource.getRepository(Metric).find({
      relations: ['repository', 'repository.tribe', 'repository.tribe.organization'],
      where: {
        repository: {
          tribe: {
            id: tribe
          }
        }
      }
    })

    if (metrics.length === 0) throw new NotFoundException('La tribu no se encuentra registrada');

    const reposId = metrics.map(metric => metric.repositoryId);

    const reposMock = this.mockService.findAll()

    const repositoriesWithState = reposId.map(repoId => reposMock.repositories.filter(({ id }) => id === repoId)[0])

    const stateRepository = {
      'E': 'Habilitado',
      'D': 'Inhabilitado',
      'A': 'Archivado',
    }

    const response = {
      repositories: metrics.map(metric => {
        return {
          id: metric.repository.id,
          name: metric.repository.name,
          tribe: metric.repository.tribe.name,
          organization: metric.repository.tribe.organization.name,
          coverage: metric.coverage + '%',
          codeSmells: metric.code_smells,
          bugs: metric.bugs,
          vulnerabilities: metric.vulnerabilities,
          hotspots: metric.hotspots,
          verificationState: 'metric.verification_state',
          state: stateRepository[metric.repository.state[0]]
        }
      })
    }

    const verificationState = {
      604: "Verificado",
      605: "En espera",
      606: "Aprobado"
    }

    return response.repositories.map(repo => {
      return {
        ...repo,
        verificationState: verificationState[repositoriesWithState.find(({ id }) => id === repo.id).state]
      }
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} repository`;
  }

  update(id: number, updateRepositoryDto: UpdateRepositoryDto) {
    return `This action updates a #${id} repository`;
  }

  remove(id: number) {
    return `This action removes a #${id} repository`;
  }
}
