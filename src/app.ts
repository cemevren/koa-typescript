import 'dotenv/config';
import Koa from 'koa';
import Router from 'koa-router';

import logger from 'koa-logger';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';
import jsend from 'koa-jsend';

import { AppDataSource } from './shared/database/dataSource';
import { userRouter } from './services/userService/rest/router';
import { errorMiddleware } from './services/userService/rest/errors/ErrorMiddleware';

AppDataSource.initialize()
  .then(async () => {
    const app = new Koa();
    app.use(errorMiddleware);

    const router = new Router();

    // Hello world
    router.get('/', async (ctx, next) => {
      ctx.body = { msg: 'Hello world!' };
      await next();
    });

    // Middlewares
    app.use(json());
    app.use(logger());
    app.use(bodyParser());
    app.use(jsend());

    // Routes
    app.use(userRouter.routes());
    app.use(router.routes()).use(router.allowedMethods());

    app.listen(3000, () => {
      console.log('Koa started');
    });
  })
  .catch((error) => console.log(error));
