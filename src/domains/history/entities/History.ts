import { Site } from 'src/domains/site/entities/Site';
import { Entity, Column, ManyToMany, JoinTable, OneToMany, ManyToOne } from 'typeorm';
import {BaseEntity} from "../../../models/BaseEntity";


@Entity({ name : "HISTORY"})
export class History extends BaseEntity{
  @Column({name:"DESCRIPTION",default:""})
  description: string = "";

  @ManyToOne(type => Site, site => site.changes,{ eager: false })
  site: any;

  constructor(description , siteId:number) {
    super();
    this.site = siteId;
    this.description = description;
  }
}