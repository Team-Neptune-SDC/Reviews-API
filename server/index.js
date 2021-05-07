const express = require('express');

const models = require('../database/index');
const Characteristics = models.Characteristic;
const Reviews = models.Review;
const Photos = models.Photo;

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/reviews', (req, res) => {
  let page, count, sort, product_id;
  req.query.page ? page = req.query.page : page = 1;
  req.query.count ? count = req.query.count : count = 5;
  req.query.sort ? sort = req.query.sort : sort = null;
  req.query.product_id ? product_id : product_id = null;

});

app.get('reviews/meta')

app.post('reviews')

app.put('/reviews/:review_id/helpful')

app.put('/reviews/:review_id/report')

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
