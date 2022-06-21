import { IdentityRepository } from './identity.repository';
import { AppDataSource } from '../../../data-source';

test('Creates a new Identity', async () => {
  await AppDataSource.initialize()
    .then(async () => {
      const repo = new IdentityRepository();
      const res = await repo.create({
        email: 'cemevren@gmail.com',
        password: 'Secret567!',
      });

      console.log(res);

      expect(typeof res.id).toBe('number');
    })
    .catch((error) => console.log(error));
});
