import { Module } from '@nestjs/common';
import { RepositoryService } from './repository.service';
import { RepositoryController } from './repository.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from './entities/repository.entity';
import { MetricsModule } from 'src/metrics/metrics.module';

@Module({
  controllers: [RepositoryController],
  providers: [RepositoryService],
  imports: [TypeOrmModule.forFeature([Repository]), MetricsModule]
})
export class RepositoryModule { }
