const mongoose = require('mongoose');
const schemas = require('./schemas');
const mongoUri = 'mongodb://localhost/sdc_reviews';

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true
});

const Characteristic = mongoose.model('Characteristic', schemas.characteristicsSchema, 'characteristis_aggregated');
const Review = mongoose.model('Review', schemas.reviewSchema, 'reviews');
const Photo = mongoose.model('Photo', schemas.photosSchema, 'reviews_photos_aggregated');

module.exports({
  Characteristic,
  Review,
  Photo
});
