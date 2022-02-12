import { Body, Controller , Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpRequest } from './requests/SignUpRequest';
import { SuccessResponse } from '../../models/SuccessResponse';
import {  ApiTags} from '@nestjs/swagger';
import { SignInRequest } from './requests/SignInRequest';

@ApiTags("User")
@Controller('user')
export class UserController {

  constructor(private userService: UserService) {}


  @Post('signUp')
  async signUp(@Body() request : SignUpRequest , @Res() response) {
    const result = await this.userService.signUp(request);
    response.json(new SuccessResponse(result.getValue()));
  }


  @Post('signIn')
  async signIn(@Body() request : SignInRequest , @Res() response) {
    const result = await this.userService.signIn(request);
    response.json(new SuccessResponse(result.getValue()));
  }


}
