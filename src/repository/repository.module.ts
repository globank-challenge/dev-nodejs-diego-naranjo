import { Module } from '@nestjs/common';
import { RepositoryService } from './repository.service';
import { RepositoryController } from './repository.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from './entities/repository.entity';

@Module({
  controllers: [RepositoryController],
  providers: [RepositoryService],
  imports: [TypeOrmModule.forFeature([Repository])]
})
export class RepositoryModule { }
