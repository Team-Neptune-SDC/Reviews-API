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
reviewSchema.index({review_id: 1});

const characteristicReviewSchema = {
  "id": Number,
  "characteristic_id": Number,
  "review_id": Number,
  "value": Number
}
characteristicReviewSchema.index({characteristic_id: 1});

const characteristicsSchema = {
  "id": Number,
  "product_id": Number,
  "name": String,
  "characteristic_review_data": [characteristicReviewSchema],
  "avg": Number
};
characteristicsSchema.index({characteristic_id: 1});

const photosArrSchema = {
  "id": Number,
  "url": String
}

const photosSchema = {
  "_id": Number,
  "photos": [photosArrSchema]
}
photosSchema.index({review_id: 1});

module.exports({
  reviewSchema,
  characteristicReviewSchema,
  characteristicsSchema,
  photosArrSchema,
  photosSchema
});