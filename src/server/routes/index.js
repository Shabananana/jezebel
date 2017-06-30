import Router from 'koa-router';
const router = new Router();

router
  .get('/about', async(context) => {
      context.body = 'about this site';
  })
  .get('/', async(context) => {
    context.state = {
      youAreUsingPug: true,
    };

    await context.render('home');
  });

export default router;
