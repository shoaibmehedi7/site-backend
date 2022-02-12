import { Module } from '@nestjs/common';
import { SiteController } from './site.controller';
import { SiteService } from './site.service';
import { JwtTokenModule } from '../misc/jwt-token/jwt-token.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../user/repositories/user.repository';
import { UserCredentialRepository } from '../user/repositories/user.credential.repository';
import { SiteRepository } from './repositories/site.repository';
import { AuditRecordRepository } from '../audit/repositories/audit-record.repository';
import { AuditItemRepository } from '../audit/repositories/audit-item.repository';

@Module({
  imports: [
    JwtTokenModule,
    TypeOrmModule.forFeature([SiteRepository , AuditRecordRepository , AuditItemRepository ])
  ],
  controllers: [SiteController],
  providers: [SiteService]
})
export class SiteModule {}
