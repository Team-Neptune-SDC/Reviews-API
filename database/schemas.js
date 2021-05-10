const mongoose = require('mongoose');

const reviewPhotosSchema = {
  "id": Number,
  "review_id": Number,
  "url": String
};

const reviewSchema = {
  "id": Number,
  "product_id": Number,
  "rating": Number,
  "date": {type: Date, default: Date.now},
  "summary": String,
  "body": String,
  "recommend": Boolean,
  "reported": Boolean,
  "reviewer_name": String,
  "reviewer_email": String,
  "response": String,
  "helpfulness": String,
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