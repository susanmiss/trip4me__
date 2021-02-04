const express = require('express');
const { getPosts, createPost, singlePost, deletePost, updatePost, photo, postById, isPoster, photoInt, photoIntOne, getPostsRelated, listSearch } = require('../controllers/post');
const { requireSignin } = require('../controllers/auth');
const router = express.Router()


router.get('/posts', getPosts);
// router.get('/posts/related/:postId', getPostsRelated)
router.post('/post/new', requireSignin, createPost);

router.get('/posts/search', listSearch);

router.get('/post/:postId', singlePost);
router.delete('/post/:postId', requireSignin, isPoster, deletePost);
router.put('/post/:postId', requireSignin, isPoster, updatePost);
router.get('/post/photo/:postId', photo);
router.get('/post/photoint/:postId', photoInt);
router.get('/post/photointone/:postId', photoIntOne);
router.param('postId', postById)


module.exports = router;
