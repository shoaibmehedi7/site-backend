import { Module } from '@nestjs/common';
import { SiteController } from './site.controller';
import { SiteService } from './site.service';
import { JwtTokenModule } from '../misc/jwt-token/jwt-token.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../user/repositories/user.repository';
import { UserCredentialRepository } from '../user/repositories/user.credential.repository';
import { SiteRepository } from './repositories/site.repository';
import { HistoryRepository } from '../history/repositories/history.repository';

@Module({
  imports: [
    JwtTokenModule,
    TypeOrmModule.forFeature([SiteRepository , HistoryRepository  ])
  ],
  controllers: [SiteController],
  providers: [SiteService]
})
export class SiteModule {}
