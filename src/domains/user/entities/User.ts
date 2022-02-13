import {Entity, Column, ManyToMany, JoinTable} from 'typeorm';
import {BaseEntity} from "../../../models/BaseEntity";


@Entity({ name : "USER"})
export class User extends BaseEntity{
  @Column({name:"NAME", nullable : false})
  firstName: string = "";

  @Column({name:"NAME", nullable : false})
  lastName: string = "";

  @Column({name:"NAME", nullable : false})
  street: string = "";

  @Column({name:"NAME", nullable : false})
  city: string = "";

  @Column({name:"NAME", nullable : false})
  zip: string = "";

  @Column({name:"EMAIL", default:""})
  email: string = "";


}