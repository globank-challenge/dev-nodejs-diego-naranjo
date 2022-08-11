import { Repository, DataSource } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRepositoryDto } from './dto/create-repository.dto';
import { UpdateRepositoryDto } from './dto/update-repository.dto';
import { TribeDto } from './dto/tribe.dto';
import { Repository as Repo } from './entities/repository.entity';
import { Metric } from 'src/metrics/entities/metric.entity';

@Injectable()
export class RepositoryService {

  constructor(
    private readonly dataSource: DataSource
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

    return metrics;
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
