import { Module } from '@nestjs/common';
import { TribeService } from './tribe.service';
import { TribeController } from './tribe.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tribe } from './entities/tribe.entity';

@Module({
  controllers: [TribeController],
  providers: [TribeService],
  imports: [TypeOrmModule.forFeature([Tribe])]
})
export class TribeModule { }
