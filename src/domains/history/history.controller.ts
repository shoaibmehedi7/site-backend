import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post, Res } from '@nestjs/common';
import { HistoryService } from './history.service';
import { GetHistoryById } from './requests/GetHistoryById';
import { SuccessResponse } from 'src/models/SuccessResponse';

@Controller('history')
@ApiTags("History")
@ApiHeader({ name:"authtoken" })
export class HistoryController {
    constructor(private siteService: HistoryService) {}


    @Post('getHistoryBySiteId')
    async getHistoryBySiteId(@Body() request : GetHistoryById , @Res() response) {
      const result = await this.siteService.getHistoryBySiteId(request);
      response.json(new SuccessResponse(result.getValue()));
    }
}
