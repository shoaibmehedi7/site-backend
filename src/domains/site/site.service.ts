import { Injectable } from '@nestjs/common';
import { Result } from '../../models/Result';
import { SiteRepository } from './repositories/site.repository';
import { CreateSiteRequest } from './requests/CreateSiteRequest';
import { Site } from './entities/Site';
import { GetSitesRequest } from './requests/GetSitesRequest';
import { UpdateSiteRequest } from './requests/UpdateSiteRequest';
import CommonException from '../../models/CommonException';
import ErrorCodes from '../../utils/ErrorCodes';
import { AuditItem } from '../audit/entities/AuditItem';
import { AuditRecord } from '../audit/entities/AuditRecord';
import { AuditRecordRepository } from '../audit/repositories/audit-record.repository';
import { AuditItemRepository } from '../audit/repositories/audit-item.repository';

@Injectable()
export class SiteService {


  constructor(
    private readonly siteRepository: SiteRepository,
    private readonly auditRecordRepository: AuditRecordRepository,
    private readonly auditItemRepository: AuditItemRepository
  ) {}


  async createSite(request: CreateSiteRequest):  Promise<Result> {

    const siteModel = new Site();

    siteModel.name = request.name;
    siteModel.description = request.description;
    siteModel.region = request.region;
    siteModel.lat = request.lat;
    siteModel.lng = request.lng;
    
    const site = await  this.siteRepository.save(siteModel);
    await this.saveAuditLog('Created' ,request.userName , request.userId, site.id);

    return Result.success(site)
  }


  async getSites(request: GetSitesRequest):  Promise<Result> {
    const siteResponse = await  this.siteRepository.find({relations:['changes']});
    return Result.success(siteResponse)
  }


  async updateSite(request: UpdateSiteRequest):  Promise<Result> {

    const oldSite = await this.siteRepository.findOne(request.id);
    if(!oldSite) throw new CommonException(ErrorCodes.SITE_NOT_FOUND);


    const auditRecord = await this.saveAuditLog('Updated' ,request.userName , request.userId, request.id);

    const keys = ['name' , 'description' , 'region', 'lat' ,'lng']
    const fieldChanges : AuditItem[]= [];

    for(const fieldName of keys){
      if(oldSite[`${fieldName}`] !== request[`${fieldName}`]){
        oldSite[`${fieldName}`] = request[`${fieldName}`]
        fieldChanges.push(this.createAuditItem(fieldName , oldSite , request , auditRecord));
      }
    }

    const site = await  this.siteRepository.save(oldSite);

    await this.auditItemRepository.save(fieldChanges);

    return Result.success(site)
  }

  private async saveAuditLog(changeType:string, userName:string,userId:number , siteId: number) {
    const auditDescription = `${changeType} By by ${userName}`;
    const auditRecordModel = new AuditRecord(auditDescription, userId, siteId);
    return await this.auditRecordRepository.save(auditRecordModel);
  }


  createAuditItem = ( fieldName:string , oldSite: Site , newRequest: UpdateSiteRequest , auditRecord: AuditRecord ) => {
    return new AuditItem(fieldName , oldSite[`${fieldName}`] , newRequest[`${fieldName}`] , auditRecord.id);
  }





}
