import { Module } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { MetricsController } from './metrics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Metric } from './entities/metric.entity';

@Module({
  controllers: [MetricsController],
  providers: [MetricsService],
  imports: [TypeOrmModule.forFeature([Metric])],
  exports: [TypeOrmModule],
})
export class MetricsModule { }
