const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: 'Title is required',
    minlength: 4,
    maxlength: 30
  },
  body: {
    type: String,
    minlength: 4,
    maxlength: 2000
  },
  paragraph1: {
    type: String,
    minlength: 4,
    maxlength: 2000
  },
  paragraph2: {
    type: String
  },
  paragraph3: {
    type: String
  },
  address: {
    type: String
  },
  city: {
    type: String
  },
  region: {
    type: String
  },
  video: {
    type: String
  },
  photo: {
    data: Buffer,
    contentType: String,
  },
  photo1: {
    data: Buffer,
    contentType: String,
  },
  photo2: {
    data: Buffer,
    contentType: String,
  },
  photo3: {
    data: Buffer,
    contentType: String,
  },
  photo4: {
    data: Buffer,
    contentType: String,
  },
  photo5: {
    data: Buffer,
    contentType: String,
  },
  photo6: {
    data: Buffer,
    contentType: String,
  },
  created: {
    type: Date,
    default: new Date()
  },
  top: {
    type: Boolean,
    default: false
  },
  updated: Date,
  category: {
    type: ObjectId,
    ref: 'Category',
    required: true
  }
}, { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema)
