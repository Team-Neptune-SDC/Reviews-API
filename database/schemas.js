const mongoose = require('mongoose');
const moment = require('moment');

const reviewPhotosSchema = {
  "id": Number,
  "review_id": Number,
  "url": String
};

let date = moment().format('YYYY-MM-DD');

const reviewSchema = {
  "id": Number,
  "product_id": Number,
  "rating": Number,
  "date": {type: String, default: date},
  "summary": String,
  "body": String,
  "recommend": String,
  "reported": String,
  "reviewer_name": String,
  "reviewer_email": String,
  "response": String,
  "helpfulness": Number,
  "photos": [reviewPhotosSchema]
};

const characteristicReviewSchema = {
  "id": Number,
  "characteristic_id": Number,
  "review_id": Number,
  "value": Number
}

const characteristicsSchema = {
  "id": Number,
  "product_id": Number,
  "name": String,
  "characteristic_review_data": [characteristicReviewSchema],
};

const maxIdsSchema = {
  "id": Number,
  "table": String
};

module.exports = {
  reviewPhotosSchema,
  reviewSchema,
  characteristicReviewSchema,
  characteristicsSchema,
  maxIdsSchema
};