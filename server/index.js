const express = require('express');

const models = require('../database/index');
const Characteristics = models.Characteristic;
const Reviews = models.Review;
const MaxIds = models.MaxId;

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/reviews', (req, res) => {
  const product_id = req.query.product_id;

  Reviews.find({product_id}, (err, results) => {
    if (err) {
      res.sendStatus(404);
    }
    res.status(200).send(results);
  }).exec();
});

app.get('/reviews/meta', (req, res) => {
  const product_id = req.query.product_id;

  Characteristics.find({product_id}, (err, results) => {
    if (err) {
      console.error(err)
      res.sendStatus(404);
    }

    let obj = {
      product_id,
      ratings: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0
      },
      recommend: {
        false: 0,
        true: 0
      },
      characteristics: {},
    };

    for (let i = 0; i < results.length; i++) {
      let values = [];
      for (let j = 0; j < results[i].characteristic_review_data.length; j++) {
        values.push(results[i].characteristic_review_data[j].value);
      }
      let avgValue = values.reduce((a, b) => a + b) / values.length;
      obj.characteristics[results[i].name] = {
        id: results[i].id,
        value: avgValue
      }
    }

    Reviews.find({product_id}, (err, results) => {
      if (err) {
        console.error(err)
        res.sendStatus(404);
      }

      for (let i = 0; i < results.length; i++) {
        results[i].recommend ? obj.recommend.true++ : obj.recommend.false++;
        obj.ratings[results[i].rating]++;
      }

      res.status(200).send(obj);
    }).exec();
  }).exec();
});

app.post('/reviews', (req, res) => {
  let reviewId;
  MaxIds.find({table: 'reviews_agg'}, (err, result) => {
    if (err) {
      res.status(404);
    }
    reviewId = result[0].id + 1;
    res.status(200);
  }).exec();

  let charsId;
  MaxIds.find({table: 'characteristics_agg'}, (err, result) => {
    charsId = result.id + 1;
  }).exec();

  let charsReviewDataId;
  MaxIds.find({table: 'characteristics_agg_reviewdata'}, (err, result) => {
    charsReviewDataId = result.id + 1;
  }).exec();

  Reviews.create({
    id: reviewId,
    product_id: req.body.product_id,
    rating: req.body.rating,
    summary: req.body.summary,
    body: req.body.body,
    recommend: req.body.recommend,
    reported: req.body.reported,
    reviewer_name: req.body.reviewer_name,
    reviewer_email: req.body.reviewer_email,
    response: req.body.response,
    helpfulness: req.body.helpfulness,
    photos: req.body.photos
  }, (err, results) => {
    if (err) {
      res.status(404).send('Could not post to Reviews');
    }
    res.status(201);
  });

  let charObj = req.body.characteristics;

  for (let key in charObj) {
    let charUpdate = {
      id: charsReviewDataId,
      characteristic_id: key,
      review_id: reviewId,
      value: 0
    };

    charUpdate.value = charObj[key]

    Characteristics.update(
      {id: key, product_id: req.body.product_id},
      {$push: {'characteristic_review_data': charUpdate}},
      (err, result) => {
        if (err) {
          res.status(404).send('Could not update characteristics')
        }
        res.status(201);
    })
  }
});

app.put('/reviews/:review_id/helpful', (req, res) => {
  let reviewId = req.params.review_id;

  Reviews.find({id: reviewId}, (err, result) => {
    if (err) {
      res.status(404).send('Could not find review to update helpfulness');
    }
    let helpfulness = result.helpfulness++;
    Reviews.updateOne({id: reviewId}, {helpfulness}, (err, results) => {
      if (err) {
        res.status(404).send('Could not mark review as helpful');
      }
      res.status(200).send(results);
    })
  })
});

app.put('/reviews/:review_id/report')

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
