import {Router} from 'express';
import { connecionDB, Test_connct } from "../../DB/connection.js";
import Blog from '../../DB/models/blog.model.js';
import User from '../../DB/models/user.model.js';


///// Get All Blogs

const Blogs=async(req,res)=>{
    try{
        const blogs = await Blog.findAll();
        return res.status(200).json({
            message:"All Blogs",
            blogs
        });
    }catch(error){
        return res.status(500).json({
            message:"Database Error",
            error:error.message
        });
    }
}

////// Create Blog 

const createBlog=async(req,res)=>{

    const {title,content,authorID}=req.body;

    try{
        const newBlog = await Blog.create({
            title,
            content,
            authorID
        });
        return res.status(201).json({
            message:"Blog Created Successfully",
            blog:newBlog
        })
        if(!newBlog){
            return res.status(400).json({
                message:"Failed to Create Blog"
            });
        }


    }catch(error){
        return res.status(500).json({
            message:"Database Error",
            error:error.message
        });

    }

}


//delete Blog by id
const deleteBlog=async(req,res)=>{
    const {id}=req.params;
    try{
        const deleteBlog=await Blog.findByPk(id); // Find the blog by primary key (id)
            if(!deleteBlog){
                return res.status(404).json(
                    {
                        message:"Blog Not Found"
                    }
                )
            }
            
            await deleteBlog.destroy(); // Delete the blog
            return res.status(200).json({
                message:"Blog Deleted Successfully"
            })
        
    }
    catch(error){
        return res.status(505).json(
            {
                message:"Database Error",
                error:error.message
            }
        )
    }



}



//delete all blogs of a user by user id
const deleteAllBlogs=async(req,res)=>{
    const {authorID}=req.params;
    try {
        const deleteBlogs=await Blog.destroy({
            where:{
                authorID:authorID
            }
        })
        if(deleteBlogs===0){
            return res.status(404).json({
                message:"No Blogs Found for the User"
            })
        }
        return res.status(200).json({
            message:"All Blogs of the User Deleted Successfully",
                deletedCount:deleteBlogs

        })



    }catch(error){
        return res.status(500).json({
            message:"Database Error",
            error:error.message
        })
    }

}

// edit blog by id

const EditBlog=async(req,res)=>{

    const {id}=req.params;
    const {title,content}=req.body;

    try{

        const editBlog=await Blog.findByPk(id);
        if(!editBlog){
            return res.status(404).json({
                message:"Blog Not Found"
            })
        }
        await editBlog.update({
            title,
            content
        })
        return res.status(200).json({
            message:"Blog Updated Successfully",
            blog:editBlog
        })



    }catch(error){

    }



}




export {Blogs,createBlog,deleteBlog,deleteAllBlogs,EditBlog};





