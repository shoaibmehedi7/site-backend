import {Entity, Column, ManyToMany, JoinTable} from 'typeorm';
import {BaseEntity} from "../../../models/BaseEntity";


@Entity({ name : "USER"})
export class User extends BaseEntity{
  @Column({name:"Fitst Name", nullable : false})
  firstName: string = "";

  @Column({name:"Last Name", nullable : false})
  lastName: string = "";

  @Column({name:"Street", nullable : false})
  street: string = "";

  @Column({name:"City", nullable : false})
  city: string = "";

  @Column({name:"Column", nullable : false})
  zip: string = "";

  @Column({name:"Email", nullable : false, unique : true})
  email: string = "";


}