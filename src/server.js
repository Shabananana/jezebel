import koa from 'koa';
import route from 'koa-route';
import views from 'koa-views';
import {dbQuery, dbConnect} from './server/db';
const app = new koa();

app.use(views(`${__dirname}/server/views`, { extension: 'pug' }))

const db = {
  something1: { name: 'shirt', price: 9.99 },
  something2: { name: 'sweater', price: 19.99 },
  something3: { name: 'pants', price: 40 },
};

const products = {
  list: (ctx) => {
    const names = Object.keys(db);
    ctx.body =  `products: ${names.join(', ')}`;
  },

  show: (ctx, name) => {
    const product = db[name];
    if (!product) {
      return ctx.throw('cannot find that product', 404);
    }
    ctx.body = `${product.name} is $${product.price.toFixed(2)}`;
  },
};

app.use(route.get('/products', products.list));
app.use(route.get('/products/:name', products.show));
app.use(route.get('/about', (ctx) => {

  dbQuery('SELECT * from campaign', null, function(err, res) {
    if(err) {
      return console.error('error running query', err);
    }

    console.log('result:', res.rows[0]);
  });

  ctx.body = 'about this site';
}));

app.use(async function (ctx) {
  ctx.state = {
    youAreUsingPug: true,
  };

  await ctx.render('home')
})

app.listen(3000);
