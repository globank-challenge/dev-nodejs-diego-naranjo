import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RepositoryService } from './repository.service';
import { CreateRepositoryDto } from './dto/create-repository.dto';
import { UpdateRepositoryDto } from './dto/update-repository.dto';
import { QueryDto } from './dto/query.dto';

@Controller('repository')
export class RepositoryController {
  constructor(private readonly repositoryService: RepositoryService) { }

  @Get()
  findAll(@Query() tribeDto: QueryDto) {
    return this.repositoryService.findAll(tribeDto);
  }

}
