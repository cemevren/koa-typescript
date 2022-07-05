import { Context } from 'koa';

export async function ApiErrorHandler(ctx: Context, err: any) {
  ctx.status = err.statusCode || err.status || err.code || 500;
  ctx.error(err.message, null, ctx.status);
}
