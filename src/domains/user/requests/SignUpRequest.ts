import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class SignUpRequest {

  @ApiModelProperty()
  @IsNotEmpty()
  name: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiModelProperty()
  @MinLength(6)
  @IsNotEmpty()
  password: string;

}