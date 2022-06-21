import { uuid } from './identity.types';
import { IdentityPropsDTO } from './IdentityProps.dto';

export class Identity {
  private constructor(IdentityPropsDTO: IdentityPropsDTO, id?: uuid) {}
  public static createIdentity(identityDTO, identityRepository) {}
}
