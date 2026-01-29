const Post = require('../models/Post')

const createPost = async(req,res)=>{
    const {title,content} = req.body
    if(!title || !content){
        return res.status(400).json({message:"Fields cannot be empty"})
    }
    const post = await Post.create({
    title,
    content,
    author: req.user._id
    })

    return res.status(201).json({
    message: "Post created successfully",
    post
  })
}

module.exports = {createPost}