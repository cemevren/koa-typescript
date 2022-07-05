import Router from 'koa-router';
import { Context, Next } from 'koa';
import { AppDataSource } from '../../../shared/database/dataSource';
import { Users } from '../entities/Users';
import { UserService } from '../UserService';
import { Profiles } from '../entities/Profiles';
import { UserMapper } from '../UserMapper';

const userRouter = new Router();
const userRepository = AppDataSource.getRepository(Users);
const profileRepository = AppDataSource.getRepository(Profiles);
const userService = new UserService(
  userRepository,
  profileRepository,
  UserMapper,
);

userRouter.post('/signup', async (ctx: Context, next: Next) => {
  const id = await userService.createUser(ctx.request.body);
  ctx.success({ id });
  await next();
});

userRouter.get('/users', async (ctx: Context, next: Next) => {
  const userList = await userService.getUserList();
  ctx.success(userList);
  await next();
});

userRouter.get('/users/:id', async (ctx: Context, next: Next) => {
  const user = await userService.getUserById(ctx.params.id);
  ctx.success(user);
  await next();
});

userRouter.patch('/users/:id', async (ctx: Context, next: Next) => {
  const user = await userService.updateUser(ctx.params.id, ctx.request.body);
  ctx.success(user);
  await next();
});

userRouter.delete('/users/:id', async (ctx: Context, next: Next) => {
  await userService.deleteUser(ctx.params.id);
  ctx.success();
  await next();
});

export { userRouter };
