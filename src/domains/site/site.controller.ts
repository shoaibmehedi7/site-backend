import { Body, Controller, Post, Res } from '@nestjs/common';
import { SuccessResponse } from '../../models/SuccessResponse';
import { SiteService } from './site.service';
import { GetSitesRequest } from './requests/GetSitesRequest';
import { CreateSiteRequest } from './requests/CreateSiteRequest';
import { UpdateSiteRequest } from './requests/UpdateSiteRequest';
import { ApiHeader, ApiTags } from '@nestjs/swagger';

@ApiTags("Site")
@ApiHeader({ name:"authtoken" })
@Controller('site')
export class SiteController {

  constructor(private siteService: SiteService) {}


  @Post('createSite')
  async createSite(@Body() request : CreateSiteRequest , @Res() response) {
    const result = await this.siteService.createSite(request);
    response.json(new SuccessResponse(result.getValue()));
  }

  @Post('getSites')
  async getSites(@Body() request : GetSitesRequest , @Res() response) {
    const result = await this.siteService.getSites(request);
    response.json(new SuccessResponse(result.getValue()));
  }


  @Post('updateSite')
  async updateSite(@Body() request : UpdateSiteRequest , @Res() response) {
    const result = await this.siteService.updateSite(request);
    response.json(new SuccessResponse(result.getValue()));
  }





}
