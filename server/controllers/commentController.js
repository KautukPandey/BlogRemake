const Comment = require('../models/Comment')
const Post = require('../models/Post')
const User = require('../models/User')


const createComment = async(req,res)=>{
    const {content} = req.body
    const { postId } = req.params
    if(!content) return res.status(400).json({message: "Cannot create empty comment"})
    
    const post = await Post.findById(postId)
    if (!post) {
        return res.status(404).json({ message: "Post not found" })
    }
    
    const comment = await Comment.create({
        author: req.user._id,
        content,
        post: postId
    })                              

    return res.status(201).json({
        message: "Comment created",
        comment
    })
}

const getCommentsForPost = async(req,res)=>{

}

module.exports = { createComment }