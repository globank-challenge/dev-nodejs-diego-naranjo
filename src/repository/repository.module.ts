import { Module } from '@nestjs/common';
import { RepositoryService } from './repository.service';
import { RepositoryController } from './repository.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from './entities/repository.entity';
import { MetricsModule } from 'src/metrics/metrics.module';
import { MockModule } from 'src/mock/mock.module';

@Module({
  controllers: [RepositoryController],
  providers: [RepositoryService],
  imports: [TypeOrmModule.forFeature([Repository]), MetricsModule, MockModule]
})
export class RepositoryModule { }
