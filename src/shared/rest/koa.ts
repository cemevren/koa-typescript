import 'dotenv/config';
import Koa from 'koa';

import logger from 'koa-logger';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';

const app = new Koa();
// Middlewares
app.use(json());
app.use(logger());
app.use(bodyParser());

export { app };
