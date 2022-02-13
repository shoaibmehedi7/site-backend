import { SiteRepository } from './../site/repositories/site.repository';
import { Injectable } from '@nestjs/common';
import { Result } from 'src/models/Result';
import { HistoryRepository } from './repositories/history.repository';
import { GetHistoryById } from './requests/GetHistoryById';

@Injectable()
export class HistoryService {
    constructor(
        private readonly historyRepository: HistoryRepository,
      ) {}
    
      async getHistoryBySiteId(request: GetHistoryById):  Promise<Result> {       
        const siteResponse = await this.historyRepository.find({where: {site: request.id},order: {createdDate: "DESC"}});
        return Result.success(siteResponse)
      }
}
