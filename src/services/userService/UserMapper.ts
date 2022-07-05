import { Users } from './entities/Users';
import _ from 'lodash';
import { uuid } from '../../shared/types';

export type ProfileDTO = {
  id: uuid;
  profileImage: string;
};

export type UserInput = {
  id: uuid;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  full_name: string;
  profile: ProfileDTO;
};

export type UserDTO = Partial<Users>;
export type CreateUserInput = Omit<UserInput, 'id' | 'full_name' | 'profile'>;
export type UserOutput = Omit<UserInput, 'password'>;
export type UserListOutput = UserOutput[];
export type UpdateUserInput = Partial<Omit<UserInput, 'full_name'>>;

export interface UserMapper {
  toOutput(user: Users): UserOutput;
  toEntity(user: CreateUserInput): UserDTO;
}

export const UserMapper = {
  toOutput: (user: Users): UserOutput => {
    const pickedProperties = _.pick(user, ['id', 'email', 'profile']);
    return {
      ...pickedProperties,
      first_name: user.firstName,
      last_name: user.lastName,
      full_name: `${user.firstName} ${user.lastName}`,
    };
  },
  toEntity: (user: CreateUserInput): UserDTO => {
    const pickedProperties = _.pick(user, ['email', 'profile', 'password']);
    return {
      ...pickedProperties,
      firstName: user.first_name,
      lastName: user.last_name,
    };
  },
};
