import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtTokenService {


  jwt = require('jsonwebtoken');

  constructor(private configService: ConfigService) {}

  generateToken = (userName: string , userId: number) => {

    const payload = {
      userName:userName,
      userId: userId,
    };

    return this.jwt.sign(payload, this.configService.get('JWT_SECRET'));
  };

  verifyToken = (token: string) => {
    console.log('i am verify token'),token;
    
    return this.jwt.verify(token, this.configService.get('JWT_SECRET'));
  };

}
