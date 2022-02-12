import {  Controller, Get, HttpCode, HttpService, Post, Res } from '@nestjs/common';
import { SuccessResponse } from '../../../models/SuccessResponse';
import {  ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

@ApiTags("Common")
@Controller('common')
export class CommonController {

  constructor(private httpService: HttpService , private configService: ConfigService) {}

  // @Get('healthCheck')
  // @HttpCode(200)
  // createNewUser(@Res() response) {
  //     response.json({ message: 'Service is up and running and updated' });
  // }


}
