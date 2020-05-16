const Post = require('../models/post')
const formidable = require('formidable')
const fs = require('fs')
const _ = require('lodash')


exports.postById = (req, res, next, id) => {
  Post.findById(id)
  .exec((err, post) => {
    if(err || !post) {
      return res.status(400).json({
        error: err
      })
    }
    req.post = post
    next()
  })
}

exports.isPoster = (req, res, next) => {
  let isPoster = req.post && req.auth && req.auth.role === "admin";

  console.log('req.post ', req.post, ' req.auth ', req.auth)

  if(!isPoster) {
    return res.status(403).json({
      error: 'User is not authorized'
    });
  }
  next();
};


exports.getPosts = async (req, res) => {
    const currentPage = req.query.page || 1;
    const perPage = 9;
    let totalItems;

    const posts = await Post.find()
        .countDocuments()
        .then(count => {
            totalItems = count;
            return Post.find()
                .skip((currentPage - 1) * perPage)
                .populate("comments", "text created")
                .sort({ date: -1 })
                .limit(perPage)
                .select("_id title body");
        })
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => console.log(err));
};


exports.createPost = (req, res, next) => {
  let form =  new formidable.IncomingForm()
  form.keepExtentions = true
  form.parse(req, (err, fields, files) => {
    if(err){
      return res.status(400).json({
        error: 'Image could not be uploaded'
      })
    }
    let post = new Post(fields)

    if(files.photo){
      post.photo.data = fs.readFileSync(files.photo.path)
    }
    if(files.photoInt){
      post.photoInt.data = fs.readFileSync(files.photoInt.path)
    }
    if(files.photoIntOne){
      post.photoIntOne.data = fs.readFileSync(files.photoIntOne.path)
    }

    post.save((err, result) => {
      if(err){
        return res.status(400).json({
          error: err
        })
      }
      res.status(200).json({
        post: result
      })
    })
  })
}



exports.updatePost = (req, res, next) => {
  let form = new formidable.IncomingForm()
  form.keepExtentions = true
  form.parse(req, (err, fields, files) => {
    if(err){
      return res.status(400).json({
        error: ' Photo could not be uploaded'
      })
    }
    let post = req.post;
    post = _.extend(post, fields)
    post.updated = Date.now()

    if(files.photo){
      post.photo.data = fs.readFileSync(files.photo.path)
      post.photo.contentType = files.photo.type
    }

    if(files.photoInt){
      post.photoInt.data = fs.readFileSync(files.photoInt.path)
      post.photoInt.contentType = files.photoInt.type
    }

    if(files.photoIntOne){
      post.photoIntOne.data = fs.readFileSync(files.photoIntOne.path)
      post.photoIntOne.contentType = files.photoIntOne.type
    }

    post.save((err, result) => {
      if(err){
        return res.status(400).json({
          error: err
        })
      }
      res.json(post)
    })
  })
}

exports.deletePost = (req, res) => {
  let post = req.post
  post.remove((err, post) => {
    if(err) {
      return res.status(400).json({
        error: err
      })
    }
    res.json({
      message: 'Post deleted successfuly'
    })
  })
}

exports.photo = (req, res, next) => {
    res.set('Content-Type', req.post.photo.contentType);
    return res.send(req.post.photo.data);
};

exports.photoInt = (req, res) => {
  res.set('Content-Type', req.post.photoInt.contentType);
  return res.send(req.post.photoInt.data);
}

exports.photoIntOne = (req, res) => {
  res.set('Content-Type', req.post.photoIntOne.contentType);
  return res.send(req.post.photoIntOne.data);
}

exports.singlePost = (req, res) => {
  return res.json(req.post);
}
