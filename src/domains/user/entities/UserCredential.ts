import {Entity, Column, ManyToMany, JoinTable} from 'typeorm';
import {BaseEntity} from "../../../models/BaseEntity";


@Entity({ name : "USER_CREDENTIAL"})
export class UserCredential extends BaseEntity{


  @Column({name:"USER_ID", nullable : false})
  userId: number;

  @Column({name:"EMAIL",  nullable : false})
  email: string = "";

  @Column({name:"PASSWORD",  nullable : false})
  password: string = "";

}