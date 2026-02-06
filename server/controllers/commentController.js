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
    const {postId} = req.params
    const page = parseInt(req.query.page, 10) || 1
    const limit = Math.min(parseInt(req.query.limit, 10) || 10, 50)

    const post = await Post.findById(postId)
    if(!post){
        return res.status(404).json({message:"Post does not exists"})
    }

    const skip = (page - 1) * limit

    const filter = {
        post: postId
    }
    const comments = await Comment.find(filter)
                                .sort({createdAt:-1})
                                .skip(skip)
                                .limit(limit)
                                .populate('author', 'name')
                                

    const numberOfComments = await Comment.countDocuments(filter);

    return res.status(200).json({
        message: "Comments fetched",
        comments,
        numberOfComments,
        page
    })

}

// const deleteComment = async(req,res)=>{
//     const { id } = req.params

//     const comment = await Comment.findById(id)
//     if (!comment || comment.isDeleted) {
//         return res.status(404).json({ message: "Comment not found" })
//     }

//     if(req.user._id.toString()!==comment.author.toString()){
//         return res.status(403).json({message: "Not the owner"})
//     }

//     comment.isDeleted = true

//     return res.status(200).json({
//         message: "Soft deleted comment",
//         comment
//     })
// }

// const updateComment = async(req,res)=>{
//     const {id} = req.params

//     const comment = await Comment.findById(id)
//     if(!comment){
//         return res.status(404).json({message:"Comment does not exists"})
//     }

// }

module.exports = { createComment , getCommentsForPost , deleteComment }