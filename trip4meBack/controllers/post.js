const Post = require('../models/post');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');
const { request } = require('http');


exports.postById = (req, res, next, id) => {
  Post.findById(id)
    .exec((err, post) => {
      if (err || !post) {
        return res.status(400).json({
          error: err
        })
      }
      req.post = post
      next()
    })
}

exports.singlePost = (req, res) => {
  return res.json(req.post);
}


exports.isPoster = (req, res, next) => {
  let isPoster = req.post && req.auth && req.auth.role === "admin";

  console.log('req.post ', req.post, ' req.auth ', req.auth)

  if (!isPoster) {
    return res.status(403).json({
      error: 'User is not authorized'
    });
  }
  next();
};

/*
top = /posts?sortBy=top&order=desc&limit=4
latest = /posts?sortBy=createdAt&order=desc&limit=4
if no param, tem all posts are returned
 */
exports.list = async (req, res) => {

  await Post.find()
    .populate('category')
    .exec((err, posts) => {
      if (err) {
        return res.status(400).json({
          error: 'Post not found'
        })
      }
      res.send(posts);
    })
}

exports.createPost = (req, res, next) => {
  let form = new formidable.IncomingForm()
  form.keepExtentions = true
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: 'Image could not be uploaded'
      })
    }
    let post = new Post(fields)

    if (files.photo) {
      post.photo.data = fs.readFileSync(files.photo.path)
    }
    if (files.photo1) {
      post.photo1.data = fs.readFileSync(files.photo1.path)
    }
    if (files.photo2) {
      post.photo2.data = fs.readFileSync(files.photo2.path)
    }
    if (files.photo3) {
      post.photo3.data = fs.readFileSync(files.photo3.path)
    }
    if (files.photo4) {
      post.photo4.data = fs.readFileSync(files.photo4.path)
    }
    if (files.photo5) {
      post.photo5.data = fs.readFileSync(files.photo5.path)
    }
    if (files.photo6) {
      post.photo6.data = fs.readFileSync(files.photo6.path)
    }

    post.save((err, result) => {
      if (err) {
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
    if (err) {
      return res.status(400).json({
        error: ' Photo could not be uploaded'
      })
    }
    let post = req.post;
    post = _.extend(post, fields)
    post.updated = Date.now()

    if (files.photo) {
      post.photo.data = fs.readFileSync(files.photo.path)
      post.photo.contentType = files.photo.type
    }

    post.save((err, post) => {
      if (err) {
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
    if (err) {
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

exports.photo1 = (req, res, next) => {
  res.set('Content-Type', req.post.photo1.contentType);
  return res.send(req.post.photo1.data);
};
exports.photo2 = (req, res, next) => {
  res.set('Content-Type', req.post.photo2.contentType);
  return res.send(req.post.photo2.data);
};
exports.photo3 = (req, res, next) => {
  res.set('Content-Type', req.post.photo3.contentType);
  return res.send(req.post.photo3.data);
};
exports.photo4 = (req, res, next) => {
  res.set('Content-Type', req.post.photo4.contentType);
  return res.send(req.post.photo4.data);
};
exports.photo5 = (req, res, next) => {
  res.set('Content-Type', req.post.photo5.contentType);
  return res.send(req.post.photo5.data);
};
exports.photo6 = (req, res, next) => {
  res.set('Content-Type', req.post.photo6.contentType);
  return res.send(req.post.photo6.data);
};



/* It will find the posts based on the req posts category
other products that has the same category will be returned
*/
exports.listRelated = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 4;
  //$ne is not encluded
  Post.find({ _id: { $ne: req.post }, category: req.post.category })
    .limit(limit)
    .populate('category', '_id name')
    .exec((err, posts) => {
      if (err) {
        return res.status(400).json({
          error: 'Post related not found'
        })
      }
      res.json(posts)
    })

}


exports.listSearch = (req, res) => {
  //create query object to hold search value
  const query = {};
  //assign search value to query.title
  if (req.query.search) {
    query.title = {
      $regex: req.query.search,
      $options: 'i'
    }
    Post.find(query, (err, posts) => {
      if (err) {
        return res.status(400).json({
          error: 'Problem if the search'
        })
      }
      res.json(posts)
    })
  }
}

