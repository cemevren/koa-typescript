import { Context } from 'koa';
import { Next } from 'koa';

export async function createIdentityCtrl(ctx: Context, next: Next) {
  ctx.logger.info('CreateIdentityController', ctx);
  await next();
}
