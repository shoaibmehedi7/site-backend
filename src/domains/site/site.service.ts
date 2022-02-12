import { Injectable } from '@nestjs/common';
import { Result } from '../../models/Result';
import { SiteRepository } from './repositories/site.repository';
import { CreateSiteRequest } from './requests/CreateSiteRequest';
import { Site } from './entities/Site';
import { GetSitesRequest } from './requests/GetSitesRequest';
import { UpdateSiteRequest } from './requests/UpdateSiteRequest';
import CommonException from '../../models/CommonException';
import ErrorCodes from '../../utils/ErrorCodes';
import { HistoryRepository } from '../history/repositories/history.repository';
import { History } from '../history/entities/History';
@Injectable()
export class SiteService {
  constructor(
    private readonly siteRepository: SiteRepository,
    private readonly historyRepository: HistoryRepository
  ) {}

  async createSite(request: CreateSiteRequest):  Promise<Result> {
    const siteModel = new Site();
    siteModel.name = request.name;
    siteModel.description = request.description;
    siteModel.region = request.region;
    siteModel.lat = request.lat;
    siteModel.lng = request.lng;

    const site = await  this.siteRepository.save(siteModel);
    await this.saveHistory('Created' ,request.userName , site.id);
    return Result.success(site)
  }

  async getSites(request: GetSitesRequest):  Promise<Result> {
    const siteResponse = await  this.siteRepository.find({relations:['changes']});
    return Result.success(siteResponse)
  }

  async updateSite(request: UpdateSiteRequest):  Promise<Result> {
    const site = await this.siteRepository.findOne(request.id);
    if(!site) throw new CommonException(ErrorCodes.SITE_NOT_FOUND);
    if(request.name)site.name = request.name;
    if(request.description)site.description = request.description;
    if(request.region)site.region = request.region;
    if(request.lat)site.lat = request.lat;
    if(request.lng)site.lng = request.lng;
    await this.saveHistory('Updated' ,request.userName , request.id);
    const res = await  this.siteRepository.save(site);
    return Result.success(res)
  }

  private async saveHistory(changeType:string, userName:string, siteId: number) {
    const historyDescription = `${changeType} By ${userName}`;
    const historyModel = new History(historyDescription,siteId);
    return await this.historyRepository.save(historyModel);
  }
}
