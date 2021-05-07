const mongoose = require('mongoose');

const reviewSchema = {
  "id": Number,
  "product_id": Number,
  "rating": Number,
  "date": String,
  "summary": String,
  "body": String,
  "recommend": Number,
  "reported": Number,
  "reviewer_name": String,
  "reviewer_email": String,
  "response": String,
  "helpfulness": String,
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
  "avg": Number
};

const photosArrSchema = {
  "id": Number,
  "url": String
}

const photosSchema = {
  "_id": Number,
  "photos": [photosArrSchema]
}

module.exports({
  reviewSchema,
  characteristicReviewSchema,
  characteristicsSchema,
  photosArrSchema,
  photosSchema
});