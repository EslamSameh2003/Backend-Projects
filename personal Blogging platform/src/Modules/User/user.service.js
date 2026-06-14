import { Router } from "express";
import { connecionDB, Test_connct } from "../../DB/connection.js";
import User from '../../DB/models/user.model.js';




/// Get User Profile

const profile=async(req,res)=>{

    const {id} = req.params;
    try{
        const user = await User.findByPk(id);
        
        if(user){
            return res.status(200).json({
                message:"User Profile",
                user
            });
        }
        if(!user){
            return res.status(404).json({
                message:"User Not Found"
            });
            
        }
    
    }
    catch(error){
        return res.status(500).json({
            message:"Database Error",
            error:error.message
        });


    }


};


// Update User Profile

const update=async(req,res)=>{

    const {id}=req.params;
    const {email,name,dob,phone,address}=req.body;
    try{
        const upfatedUser = await User.findByPk(id);

        if(!upfatedUser){
            return res.status(404).json(
                {
                    message:"User Not Found",
                    error:error.message
                }
            )
        }

        await upfatedUser.update({
            email,
            name,
            dob,
            phone,
            address,
        });

        return res.status(200).json({
            message:"User Updated Successfully",
            upfatedUser
        });
            
    

    }catch(error){
        return res.status(500).json({
            message:"Database Error",
            error:error.message
        });
    } 
                

}


// Delete User 

const deleteUser=async(req,res)=>{
    const {id}=req.params;

    try{
        const delete_user = await User.findByPk(id);
        if(!delete_user)
        {
            return res.status(404).json({
                message:"User Not Found",   
                erreor:error.message
            })
        }
        await delete_user.destroy();
        return res.status(200).json({
            message:"User Deleted Successfully",
            delete_user
        });

    }catch(error){
        return res.status(500).json({
            message:"Database Error",
            error:error.message
        });
    }

}



export {profile,update,deleteUser};


