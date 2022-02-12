import { SiteRepository } from './../site/repositories/site.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { JwtTokenModule } from '../misc/jwt-token/jwt-token.module';
import { HistoryRepository } from './repositories/history.repository';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';

@Module({
    imports: [
        JwtTokenModule,
        TypeOrmModule.forFeature([HistoryRepository,SiteRepository  ])
      ],
      controllers: [HistoryController],
      providers: [HistoryService]
})
export class HistoryModule {}
