import {Entity, Column, ManyToMany, JoinTable} from 'typeorm';
import {BaseEntity} from "../../../models/BaseEntity";


@Entity({ name : "USER"})
export class User extends BaseEntity{
  @Column({name:"FIRST_NAME", nullable : false})
  firstName: string = "";

  @Column({name:"LAST_NAME", nullable : false})
  lastName: string = "";

  @Column({name:"STREET", nullable : false})
  street: string = "";

  @Column({name:"CITY", nullable : false})
  city: string = "";

  @Column({name:"ZIP", nullable : false})
  zip: string = "";

  @Column({name:"EMAIL", nullable : false, unique : true})
  email: string = "";


}