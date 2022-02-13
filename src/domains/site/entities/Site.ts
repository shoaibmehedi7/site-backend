import { History } from 'src/domains/history/entities/History';
import { Entity, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import {BaseEntity} from "../../../models/BaseEntity";


@Entity({ name : "SITE"})
export class Site extends BaseEntity{

  @Column({name:"NAME", nullable : false})
  name: string = "";

  @Column({name:"DESCRIPTION",default:""})
  description: string = "";

  @Column({name:"REGION", default:""})
  region: string = "";

  @Column({type:'float',name:"LATITUDE", default:0.0})
  lat: number;

  @Column({type:'float',name:"LONGITUDE", default:0.0})
  lng: number;

  @OneToMany(
    type => History,
    record => record.site,
    {
      eager: false
    }
  )
  changes: History[];

}