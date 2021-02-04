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
  photo: {
    data: Buffer,
    contentType: String,
  },
  created: {
    type: Date,
    default: new Date()
  },
  updated: Date,
  photoInt: {
    data: Buffer,
    contentType: String,
  },
  photoIntOne: {
    data: Buffer,
    contentType: String
  },
  category: {
    type: ObjectId,
    ref: 'Category',
    required: true
  }
}, { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema)
