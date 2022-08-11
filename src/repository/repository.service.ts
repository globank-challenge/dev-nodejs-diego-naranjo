import { Repository, DataSource } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRepositoryDto } from './dto/create-repository.dto';
import { UpdateRepositoryDto } from './dto/update-repository.dto';
import { QueryDto } from './dto/query.dto';
import { Repository as Repo } from './entities/repository.entity';
import { Metric } from 'src/metrics/entities/metric.entity';
import { MockService } from 'src/mock/mock.service';

@Injectable()
export class RepositoryService {

  constructor(
    private readonly dataSource: DataSource,

    private readonly mockService: MockService
  ) { }

  async findAll(queryDto: QueryDto) {
    const { tribe, coverage = 75, date = new Date().getFullYear(), state = 'E' } = queryDto;
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

    if (metrics.length === 0) throw new NotFoundException(`La tribu con id ${tribe} no se encuentra registrada`);

    const coverageUpParameter = metrics.filter(metric => metric.coverage >= coverage);
    if (coverageUpParameter.length === 0) throw new NotFoundException(`La tribu no tiene repositorios que cumplan con cobertura del ${coverage}% o superior`);

    const isDateInThisYear = (dateRepository: string) => {
      const year = new Date(dateRepository).getFullYear()
      return year === date;
    }

    const reposInThisYear = coverageUpParameter.filter(({ repository }) => isDateInThisYear(repository.create_time));
    if (reposInThisYear.length === 0) throw new NotFoundException(`La tribu no tiene repositorios creados en el año ${date}`);

    const stateRepository = {
      'E': 'Habilitado',
      'D': 'Inhabilitado',
      'A': 'Archivado',
    }

    const reposInTheState = reposInThisYear.filter(({ repository }) => repository.state[0] === state.toUpperCase());
    if (reposInTheState.length === 0) throw new NotFoundException(`La tribu no tiene repositorios en el estado ${stateRepository[state.toUpperCase()]}`);

    const reposId = reposInTheState.map(metric => metric.repositoryId);

    const reposMock = this.mockService.findAll()

    const repositoriesWithState = reposId.map(repoId => reposMock.repositories.filter(({ id }) => id === repoId)[0])


    const response = {
      repositories: reposInTheState.map(metric => {
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
          state: stateRepository[metric.repository.state[0]],
          createTime: metric.repository.create_time,
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

}
