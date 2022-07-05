import { Context } from 'koa';

export async function ValidationErrorHandler(ctx: Context, err: any) {
  ctx.status = err.statusCode || err.status || 422;
  ctx.error('Validation error.', err.flatten(), ctx.status);
}
