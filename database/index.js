const mongoose = require('mongoose');
const schemas = require('./schemas');
const mongoUri = 'mongodb://localhost/sdc_reviews';

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true
});

const Characteristic = mongoose.model('Characteristic', schemas.characteristicsSchema, 'characteristics_aggregated');
const Review = mongoose.model('Review', schemas.reviewSchema, 'reviews_aggregated');
const MaxId = mongoose.model('MaxId', schemas.maxIdsSchema, 'maxIds');

module.exports = {
  Characteristic,
  Review,
  MaxId
};
