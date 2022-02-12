import { User } from '../entities/User';
import { UserCredential } from '../entities/UserCredential';

export class UsersAuthenticationResponse {



  userId = 0;
  name = "";
  jwtToken = "";
  email="";


  constructor(userData : User ,  jwtToken:string) {
    if(userData){
      this.userId = userData.id;
      this.name = userData.name;
      this.email = userData.email;
      this.jwtToken = jwtToken;
    }
  }

}