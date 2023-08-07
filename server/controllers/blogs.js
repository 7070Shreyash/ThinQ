import Blog from "../models/Blog.js";
import User from "../models/User.js";

export const createBlog = async (req,res) => {
    try{
        const { userId , title , description , picturePath } = req.body;
        const user = await User.findById(userId);
        const newBlog = new Blog({
            userId,
            firstName : user.firstName,
            lastName : user,lastName,
            location : user.location,
            title,
            description,
            picturePath,
            userPicturePath : user.picturePath,
            likes : {},
        });
        await newBlog.save();
        user.contributions += 10;
        await User.findByIdAndUpdate(
            userId,
            {contributions : user.contributions},
            {new : true},
        );
        const blog = await Blog.find();
        res.status(201).json(blog);
    } catch(err) {
        res.status(409).json({message : err.message});
    }
};

export const getFeedBlogs = async (req,res) => {
    try{
        const blog = await Blog.find();
        res.status(200).json(blog);
    } catch(err) {
        res.status(500).json({message : err.message});
    }
};

export const getUserBlogs = async (req,res) => {
    try{
        const { userId } = req.params;
        const blog = await Blog.find({ userId });
        res.status(200).json(blog);

    } catch(err) {
        res.status(500).json({message : err.message});
    }
};

export const likeBlog = async (req,res) => {
    try{

        const { blogId } = req.params;
        const { userId } = req.body;
        
        const blog = await Blog.findById(blogId);
        const isLiked = blog.likes.get(userId);

        if(isLiked) {
            blog.likes.delete(userId);
        } else {
            blog.likes.set(userId,true);
        }

        const updatedBlog = await Blog.findByIdAndUpdate(
            blogId,
            {likes : blog.likes},
            {new : true},
        );
        res.status(200).json(updatedBlog);

    } catch(err) {
        res.status(500).json({message : err.message});
    }
};

