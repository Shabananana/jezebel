import Router from 'koa-router';
import head from 'lodash/head';
import {pool} from './../db';

const router = new Router();

router
  .get('/campaigns', async(context) => {
    let campaigns = [];
    await pool.query('SELECT * FROM campaign')
      .then(response => campaigns = response.rows)
      .catch(e => console.error(e.stack));

    context.state = {
      campaigns,
    };

    await context.render('campaignList');
  })
  .get('/campaigns/add', async(context) => {
    const query = 'INSERT INTO campaign (description, start_date, end_date, remaining_stock) VALUES($1, $2, $3, $4)';
    const values = ['I am another test campaign', '2018-06-27', '2018-07-12', 50];
    await pool.query(query, values)
      .catch(e => console.error(e.stack));

    await context.redirect('/campaigns');
  })
  .get('/campaigns/:id', async(context) => {
    const {id} = context.params;
    let campaign = null;
    await pool.query('SELECT * FROM campaign WHERE id = $1', [id])
      .then(response => campaign = head(response.rows))
      .catch(e => console.error(e.stack));

    context.state = {
      campaign,
    };

    await context.render('campaign');
  });

export default router;
