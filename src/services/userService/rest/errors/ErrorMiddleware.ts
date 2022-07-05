import { Context, Next } from 'koa';
import { ValidationErrorHandler } from './validationErrorHandler';
import { ApiErrorHandler } from './apiErrorHandler';

export async function errorMiddleware(ctx: Context, next: Next) {
  try {
    await next();
  } catch (err) {
    console.log(err);
    if (err.constructor.name === 'ZodError') {
      return ValidationErrorHandler(ctx, err);
    } else {
      return ApiErrorHandler(ctx, err);
    }
  }
}
