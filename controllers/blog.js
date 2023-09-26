const Blog = require("../models/blog.js");
const User = require("../models/user.js");
const asyncHandler = require("express-async-handler");
const {validateMongoDbId} = require("../utils/validateMongodb.js");



const createBlog = asyncHandler(async(req,res)=>{
    try{
        const newBlog = await Blog.create(req.body);
        res.json({
            status:"success",
            newBlog,
        });

    } catch(error){
        throw new Error(error);
    }

})

const updateBlog = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    validateMongoDbId(id);
    try{
        const updateBlog = await Blog.findByIdAndUpdate({_id:id},req.body, {new:true});
        res.json(updateBlog);

    } catch(error){
        throw new Error(error);
    }

})

const getSingleBlog = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    validateMongoDbId(id);
    try{
        const getBlog = await Blog.findById(id)
        .populate("likes")
        .populate("dislikes");
        const updateViews = await Blog.findByIdAndUpdate({_id:id},{$inc:{numViews:1}}, {new:true});
        res.json(getBlog);

    } catch(error){
        throw new Error(error);
    }

})


const getAllBlogs = asyncHandler(async(req,res)=>{
   
    try{
        const getallblogs = await Blog.find();
        res.json(getallblogs);

    } catch(error){
        throw new Error(error);
    }

})


const deleteBlog = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    validateMongoDbId(id);
    try{
        const deleteBlog = await Blog.findByIdAndDelete({_id:id});
        res.json(deleteBlog);

    } catch(error){
        throw new Error(error);
    }

})


const likeBlog = asyncHandler(async(req,res)=>{
    const {blogId} = req.body;
    validateMongoDbId(blogId);

    // Find the blog which you want to be liked
    const blog = await Blog.findById(blogId);

    // Find the login user
    const loginUserId = req?.user?._id;

    // Find if the user liked the post
    const isLiked = blog?.isLiked;


     // Find if the user disliked the post
    const alreadyDisliked = blog?.dislikes?.find(
        (userId)=>userId?.toString() === loginUserId?.toString()
        );
    if (alreadyDisliked){
        const blog = await Blog.findByIdAndUpdate({_id:blogId},{
            $pull:{dislikes: loginUserId},
            isDisliked:false,
        },
        {new:true}
        );
        res.json(blog)
    }
    if (isLiked){
        const blog = await Blog.findByIdAndUpdate({_id:blogId},{
            $pull:{likes: loginUserId},
            isLiked:false
        },
        {new:true}
        );
        res.json(blog)
    }else{
        const blog = await Blog.findByIdAndUpdate({_id:blogId},{
            $push:{likes: loginUserId},
            isLiked:true,
        },
        {new:true}
        );
        res.json(blog)

    }
})


const dislikeBlog = asyncHandler(async (req, res) => {
    const { blogId } = req.body;
    validateMongoDbId(blogId);
    // Find the blog which you want to be liked
    const blog = await Blog.findById(blogId);
    // find the login user
    const loginUserId = req?.user?._id;
    // find if the user has liked the blog
    const isDisLiked = blog?.isDisliked;
    // find if the user has disliked the blog
    const alreadyLiked = blog?.likes?.find(
      (userId) => userId?.toString() === loginUserId?.toString()
    );
    if (alreadyLiked) {
      const blog = await Blog.findByIdAndUpdate(
        {_id:blogId},
        {
          $pull: { likes: loginUserId },
          isLiked: false,
        },
        { new: true }
      );
      res.json(blog);
    }
    if (isDisLiked) {
      const blog = await Blog.findByIdAndUpdate(
        {_id:blogId},
        {
          $pull: { dislikes: loginUserId },
          isDisliked: false,
        },
        { new: true }
      );
      res.json(blog);
    } else {
      const blog = await Blog.findByIdAndUpdate(
        {_id:blogId},
        {
          $push: { dislikes: loginUserId },
          isDisliked: true,
        },
        { new: true }
      );
      res.json(blog);
    }
  });




module.exports = {createBlog, updateBlog, getSingleBlog, getAllBlogs, deleteBlog, likeBlog, dislikeBlog}