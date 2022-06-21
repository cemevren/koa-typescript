import { Context } from 'koa';
import { Next } from 'koa';

export async function getIdentityByIdCtrl(ctx: Context, next: Next) {
  const { id } = ctx.request.body;
  ctx.logger.info('getIdentityByIdCtrl', ctx);
  await next();
}
