import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { BaseRequest } from '../../../models/BaseRequest';

export class GetHistoryById{


  @ApiModelProperty()
  @IsNotEmpty()
  id: number;

}