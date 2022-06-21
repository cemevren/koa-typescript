import 'dotenv/config';
import Koa from 'koa';
import Router from 'koa-router';

import logger from 'koa-logger';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';

import { AppDataSource } from './data-source';
import { createIdentityCtrl } from './services/identityService/app/createIdentity.ctrl';

AppDataSource.initialize()
  .then(async () => {
    const app = new Koa();
    const router = new Router();

    // Hello world
    router.get('/', async (ctx, next) => {
      ctx.body = { msg: 'Hello world!' };

      await next();
    });

    router.post('/identity/create-identity', createIdentityCtrl);
    router.get('/identity/:id', getIdentityByIdCtrl);

    // Middlewares
    app.use(json());
    app.use(logger());
    app.use(bodyParser());

    // Routes
    app.use(router.routes()).use(router.allowedMethods());

    app.listen(3000, () => {
      console.log('Koa started');
    });
  })
  .catch((error) => console.log(error));
