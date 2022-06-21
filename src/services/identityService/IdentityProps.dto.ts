import { uuid } from './identity.types';

export interface IdentityPropsDTO {
  id: uuid;
  email: string;
  password: string;
  permissions: string[];
}
