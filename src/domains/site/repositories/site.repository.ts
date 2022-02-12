import { EntityRepository, Repository } from 'typeorm';
import { Site } from '../entities/Site';


@EntityRepository(Site)
export class SiteRepository extends Repository<Site> {}