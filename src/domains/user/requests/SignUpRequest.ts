import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class SignUpRequest {

  @ApiModelProperty()
  @IsNotEmpty()
  firstName: string;

  @ApiModelProperty()
  @IsNotEmpty()
  lastName: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiModelProperty()
  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @ApiModelProperty()
  @IsNotEmpty()
  street: string;

  @ApiModelProperty()
  @IsNotEmpty()
  city: string;

  @ApiModelProperty()
  @IsNotEmpty()
  zip: string;
}