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

const getAllPosts = async(req,res)=>{
  
  const posts = await Post.find().populate('author','name')

  return res.status(200).json({
    message: "All posts fetched",
    posts
  })
}

const getPostById = async(req,res)=>{
  const {id} = req.params

  const post = await Post.findById(id).populate('author','name')
  if(!post){
    return res.status(404).json({message:"No post found"})
  }
  return res.status(200).json({
    message: "Post returned",
    post
  })
  
}

const updatePost = async(req,res)=>{
  const {id} = req.params
  const { title, content } = req.body

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" })
  }
  const post = await Post.findById(id)
  if(!post){
    return res.status(404).json({message:"No post found"})
  }
  if(req.user._id.toString()!==post.author.toString()){
    return res.status(403).json({message:"Not the owner"})
  }

  const post1 = await Post.findByIdAndUpdate(
    id,
    {title,content},
    {new:true,runValidators:true}
  )
  return res.status(200).json({
    message: "Post updated",
    post1
  })

}

const deletePost = async(req,res)=>{
  const {id} = req.params
  const post = await Post.findById(id)
  if(!post){
    return res.status(404).json({message:"No post found"})
  }
  if(req.user._id.toString()!==post.author.toString()){
    return res.status(403).json({message: "Not the owner"})
  }

  const delPost = await Post.findByIdAndDelete(id)

  return res.status(200).json({
    message: "Post deleted"
  })
}

module.exports = {createPost, getAllPosts, getPostById, updatePost, deletePost}