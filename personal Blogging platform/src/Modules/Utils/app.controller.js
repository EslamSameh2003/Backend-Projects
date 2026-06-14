import authroutes from "../Auth/auth.conrtoller.js";
import userroutes from "../User/user.conrtoller.js";
import blogroutes from "../Blog/blog.conrtoller.js";
import express from "express";
import {connecionDB ,Test_connct}from '../../DB/connection.js'; 
import User from '../../DB/models/user.model.js';
import Blog from '../../DB/models/blog.model.js';



const routes=async(express,app)=>{

    User.hasMany(Blog, { foreignKey: 'authorID' });
    Blog.belongsTo(User, { foreignKey: 'authorID' });

    app.use(express.json());
    app.use("/Auth",authroutes);
    app.use("/User",userroutes);
    app.use("/Blog",blogroutes);


}

export default routes;