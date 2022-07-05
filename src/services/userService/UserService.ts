import { Repository } from 'typeorm';
import fp from 'lodash/fp';
import { Users } from './entities/Users';
import { Profiles } from './entities/Profiles';
import { uuid } from '../../shared/types';
import { InvalidParameterError } from './UserErrors';
import { z } from 'zod';
import { createUserInputSchema } from './validaton_schema/createUserInput.schema';
import { UserMapper, CreateUserInput, UpdateUserInput } from './UserMapper';

export class UserService {
  #userRepository: Repository<Users>;
  #profileRepository: Repository<Profiles>;
  #UserMapper: UserMapper;

  constructor(
    userRepository: Repository<Users>,
    profileRepository: Repository<Profiles>,
    UserMapper: UserMapper,
  ) {
    this.#userRepository = userRepository;
    this.#profileRepository = profileRepository;
    this.#UserMapper = UserMapper;
  }

  public async getUserById(id: uuid) {
    const vIdRes = z.string().uuid().safeParse(id);

    if (!vIdRes.success) {
      throw new InvalidParameterError('Invalid Id');
    }
    const user = await this.#userRepository.findOneOrFail({
      where: { id: vIdRes.data },
      relations: ['profile'],
    });
    return UserMapper.toOutput(user);
  }

  public async getUserList() {
    const userList = await this.#userRepository.find({
      relations: ['profile'],
    });

    return userList.map((user) => this.#UserMapper.toOutput(user));
  }

  public async createUser(createUserInput: CreateUserInput): Promise<uuid> {
    const validatedCreateUserInput = createUserInputSchema.parse(
      createUserInput,
    ) as CreateUserInput;

    const userDTO = this.#UserMapper.toEntity(validatedCreateUserInput);

    const user = {
      ...this.#userRepository.create(userDTO),
      profile: this.#profileRepository.create(),
    };

    const savedUser = await this.#userRepository.save(user);
    return savedUser.id;
  }

  public async updateUser(id: uuid, updateUserInput: UpdateUserInput) {
    const getUser = fp.flow(
      fp.unset('profile'),
      fp.curry((d: UpdateUserInput) => this.#userRepository.create(d)),
      fp.set('id', id),
      fp.set(
        'profile',
        this.#profileRepository.create(updateUserInput.profile),
      ),
    ) as (updateUserInput: UpdateUserInput) => Users;

    const user = getUser(updateUserInput);
    console.log(user);

    return await this.#userRepository.save(user);
  }

  public async deleteUser(id: uuid) {
    await this.#userRepository.delete(id);
    return;
  }
}
