import Router from 'koa-router';
const router = new Router();

const db = {
  something1: { name: 'shirt', price: 9.99 },
  something2: { name: 'sweater', price: 19.99 },
  something3: { name: 'pants', price: 40 },
};

router
  .get('/products', async(context) => {
    const names = Object.keys(db);
    context.body = `products: ${names.join(', ')}`;
  })
  .get('/products/:name', async(context) => {
    const {name} = context.params;
    const product = db[name];
    if (!product) {
      return context.status = 404;
    }
    context.body = `${product.name} is $${product.price.toFixed(2)}`;
  });

export default router;
