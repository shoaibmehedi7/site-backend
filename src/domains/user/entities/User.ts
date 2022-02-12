import {Entity, Column, ManyToMany, JoinTable} from 'typeorm';
import {BaseEntity} from "../../../models/BaseEntity";


@Entity({ name : "USER"})
export class User extends BaseEntity{


  @Column({name:"NAME", nullable : false})
  name: string = "";

  @Column({name:"PHONE",default:""})
  phone: string = "";

  @Column({name:"EMAIL", default:""})
  email: string = "";


}