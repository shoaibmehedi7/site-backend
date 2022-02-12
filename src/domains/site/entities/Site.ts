import { Entity, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import {BaseEntity} from "../../../models/BaseEntity";
import { AuditRecord } from '../../audit/entities/AuditRecord';


@Entity({ name : "SITE"})
export class Site extends BaseEntity{

  @Column({name:"NAME", nullable : false})
  name: string = "";

  @Column({name:"DESCRIPTION",default:""})
  description: string = "";

  @Column({name:"REGION", default:""})
  region: string = "";

  @Column({name:"LATITUDE", default:0.0})
  lat: number;

  @Column({name:"LONGITUDE", default:0.0})
  lng: number;

  @OneToMany(
    type => AuditRecord,
    record => record.site,
    {
      eager: false
    }
  )
  changes: AuditRecord[];

}