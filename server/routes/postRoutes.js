const express = require('express')
const router = express.Router()

const protect = require('../middlewares/authMiddleware')
const restrictTo = require('../middlewares/restrictTo')


const {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost
} = require('../controllers/postController')

//Public routes
router.get('/',getPosts)
router.get('/:id',getPostById)


//Protected routes
router.post('/',protect,restrictTo('user','admin'),createPost)
router.put('/:id',protect,restrictTo('user','admin'),updatePost)
router.delete('/:id',protect,restrictTo('user','admin'),deletePost)


module.exports = router