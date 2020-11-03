const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config.js');

const postCtrl = require('../controllers/post');

router.get('/', auth, postCtrl.getAllPosts); // IS OK
router.get('/:id', auth, postCtrl.getOnePost); // IS OK
router.get('/:userId/posts', auth, postCtrl.myPosts); // IS OK
router.post('/', auth, multer, postCtrl.createPost); // IS OK 
router.put('/:id', auth, multer, postCtrl.modifyPost); // IS OK
router.delete('/:id', auth, postCtrl.deletePost); // IS OK

router.post('/:id/like', auth, postCtrl.likePost); // IS OK
router.get('/likedislike/:id', auth, postCtrl.getLikesDislikes); // IS OK

router.post('/:id/comments', auth, postCtrl.createComment); // IS OK
router.put('/:id/comments/:idcomment', auth, postCtrl.modifyComment); // IS OK
router.delete('/:id/comments/:idcomment', auth, postCtrl.deleteComment); // IS OK


module.exports = router;