import { Injectable } from '@nestjs/common';
import { Result } from 'src/models/Result';
import { SiteRepository } from '../site/repositories/site.repository';
import { HistoryRepository } from './repositories/history.repository';
import { GetHistoryById } from './requests/GetHistoryById';

@Injectable()
export class HistoryService {
    constructor(
        private readonly siteRepository: SiteRepository,
      ) {}
    
      async getHistoryBySiteId(request: GetHistoryById):  Promise<Result> {        
        const siteResponse = await  this.siteRepository.findOneOrFail(request.id,{relations:['changes']});
        return Result.success(siteResponse)
      }
}
