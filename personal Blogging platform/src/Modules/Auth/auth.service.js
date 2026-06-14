import {connecionDB ,Test_connct}from '../../DB/connection.js'; 
import User from '../../DB/models/user.model.js';
import Blog from '../../DB/models/blog.model.js';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



                            //login

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // compare password 🔐
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid password"
            });
        }

        // create token 🪙
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            "secretKey123", // (later we can move it to config)
            { expiresIn: "1h" }
        );

        return res.status(200).json({
            message: "Login successful",
            token
        });
        console.log(user);
        console.log(password);
        console.log(user.password);

    } catch (error) {
        return res.status(500).json({
            message: "Database error",
            error: error.message
        });
    }
};

//////////////////////////////////////////////////


     /////////////////signup ///////////////


const signup = async (req, res) => {
    const {
        name,
        email,
        password,
        phone,
        address,
        gender,
        dob
    } = req.body;

    try {
        // validate fields
        if (!name || !email || !password || !phone || !address || !gender || !dob) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // check user exists
        const checkUser = await User.findOne({ where: { email } });

        if (checkUser) {
            return res.status(409).json({
                message: "Email already exists"
            });
        }

        // create user (password will be hashed by hook)
        const user = await User.create({
            name,
            email,
            password,
            phone,
            address,
            gender,
            dob
        });

        return res.status(201).json({
            message: "User created successfully",
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
            
        });
        console.log(user);
        console.log(password);
        console.log(user.password);

    } catch (error) {
        return res.status(500).json({
            message: "Database error",
            error: error.message
        });
    }
};

export {login,signup};








