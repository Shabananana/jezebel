import koa from 'koa';
const app = new koa();

app.use(ctx => {
  ctx.body = 'Hello Emelia the bozo!';
});

app.listen(3000);
