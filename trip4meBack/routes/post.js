const express = require('express');
const { list, createPost, singlePost, deletePost, updatePost, photo, photo1, photo2, photo3, photo4, photo5, photo6, postById, isPoster, listRelated, listSearch } = require('../controllers/post');
const { requireSignin } = require('../controllers/auth');
const router = express.Router()


router.get('/posts', list);

router.post('/post/new', requireSignin, createPost);
router.get('/posts/related/:postId', listRelated);

router.get('/post/:postId', singlePost);

router.get('/posts/search', listSearch);

router.delete('/post/:postId', requireSignin, isPoster, deletePost);
router.put('/post/:postId', requireSignin, isPoster, updatePost);
router.get('/post/photo/:postId', photo);
router.get('/post/photo1/:postId', photo1);
router.get('/post/photo2/:postId', photo2);
router.get('/post/photo3/:postId', photo3);
router.get('/post/photo4/:postId', photo4);
router.get('/post/photo5/:postId', photo5);
router.get('/post/photo6/:postId', photo6);

router.param('postId', postById)

module.exports = router;
