import Koa from 'koa';
import compose from 'koa-compose';
import views from 'koa-views';
import {dbQuery, dbConnect} from './server/db';
import rootRouter from './server/routes/index';
import productRouter from './server/routes/product';
import campaignRouter from './server/routes/campaign';

const app = new Koa();

app.use(views(`${__dirname}/server/views`, { extension: 'pug' }))

const router = compose([
  rootRouter.routes(),
  rootRouter.allowedMethods(),
  productRouter.routes(),
  productRouter.allowedMethods(),
  campaignRouter.routes(),
  campaignRouter.allowedMethods(),
]);

app.use(router);

app.listen(3000);
