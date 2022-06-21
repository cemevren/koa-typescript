import { Identity } from './Identity.model';
import { AppDataSource } from '../../../data-source';
import { Repository } from 'typeorm';

interface createIdentityDTO {
  email: string;
  password: string;
}

export interface IIdentityRepository {
  getById(id: string): Promise<Identity>;
}

export class IdentityRepository implements IIdentityRepository {
  private IdentityDataSource: Repository<Identity>;

  public constructor() {
    this.IdentityDataSource = AppDataSource.getRepository(Identity);
  }
  async getById(id: string): Promise<Identity> {
    return this.IdentityDataSource.findOneBy({ id });
  }
  async create(data: createIdentityDTO): Promise<Identity> {
    return this.IdentityDataSource.create(data);
  }
}
