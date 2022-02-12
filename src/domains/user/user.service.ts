import { Injectable } from '@nestjs/common';
import { User } from './entities/User';
import { UserRepository } from './repositories/user.repository';
import { Result } from '../../models/Result';
import { SignUpRequest } from './requests/SignUpRequest';
import { UsersAuthenticationResponse } from './responses/UsersAuthenticationResponse';
import CommonException from '../../models/CommonException';
import ErrorCodes from '../../utils/ErrorCodes';
import { SignInRequest } from './requests/SignInRequest';
import { UserCredential } from './entities/UserCredential';
import { UserCredentialRepository } from './repositories/user.credential.repository';
import { JwtTokenService } from '../misc/jwt-token/jwt-token.service';


@Injectable()
export class UserService {


    constructor(
      private readonly jwtTokenService: JwtTokenService ,
      private readonly userRepository: UserRepository ,
      private readonly userCredentialRepository: UserCredentialRepository
    ) {}


    async signUp(request: SignUpRequest):  Promise<Result> {
        await this.checkIfUserAlreadyExists(request);
        const user = await this.saveUser(request);
        await this.saveUserCredential(user, request);
        const jwtToken = this.generateToken(user);
        const userAuthenticationResponse = new UsersAuthenticationResponse(user , jwtToken)

        return Result.success(userAuthenticationResponse)
    }


    private async checkIfUserAlreadyExists(request: SignUpRequest) {
        const oldUser = await this.userRepository.findOne({
            where: {
                email: request.email,
            },
        });
        if (oldUser) throw  new CommonException(ErrorCodes.USER_ALREADY_EXISTS);
    }

    async signIn(request: SignInRequest):  Promise<Result> {

        const userCredential = await this.getUserCredentialFromId(request);
        const user = await this.userRepository.findOne(userCredential.userId);
        const jwtToken = this.generateToken(user);
        const userAuthenticationResponse = new UsersAuthenticationResponse(user , jwtToken)

        return Result.success(userAuthenticationResponse)
    }


    private async getUserCredentialFromId(request: SignInRequest) {
        const userCredential = await this.userCredentialRepository.findOne({
            where: {
                email: request.email,
                password: request.password,
            },
        });
        if (!userCredential) throw new CommonException(ErrorCodes.USER_NOT_FOUND);

        return userCredential;
    }

    generateToken =  (user: User):string => {
        return  this.jwtTokenService.generateToken(user.name , user.id);
    }


    private async saveUser(request: SignUpRequest) {


        const userModel = new User();
        userModel.name = request.name;
        userModel.email = request.email;
        return await this.userRepository.save(userModel);
    }

    private async saveUserCredential(user: User, request: SignUpRequest) {
        const userCredentialModel = new UserCredential();
        userCredentialModel.userId = user.id;
        userCredentialModel.email = request.email;
        userCredentialModel.password = request.password;
        await this.userCredentialRepository.save(userCredentialModel);
    }

}
