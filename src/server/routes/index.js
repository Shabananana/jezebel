import Router from 'koa-router';
import {dbQuery} from './../db';
const router = new Router();

router
  .get('/about', async(context) => {
      dbQuery('SELECT * from campaign', null, function(err, res) {
        if(err) {
          return console.error('error running query', err);
        }

        console.log('result:', res.rows[0]);
      });

      context.body = 'about this site';
  })
  .get('/', async(context) => {
    context.state = {
      youAreUsingPug: true,
    };

    await context.render('home')
  });

export default router;
