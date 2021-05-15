const mongoose = require('mongoose');
const schemas = require('./schemas');
require('dotenv').config();
const mongoUri = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PW}@${process.env.MONGO_IP}:27017/sdc_reviews`;

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

const Characteristic = mongoose.model('Characteristic', schemas.characteristicsSchema, 'characteristics_aggregated');
const Review = mongoose.model('Review', schemas.reviewSchema, 'reviews_aggregated');
const MaxId = mongoose.model('MaxId', schemas.maxIdsSchema, 'maxIds');

module.exports = {
  Characteristic,
  Review,
  MaxId
};
