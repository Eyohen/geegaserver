const User = require('../models/user.js');
const bcrypt = require('bcrypt');
const asyncHandler = require("express-async-handler");
// const { generateToken } = require('../config/jwtToken.js');
const {validateMongoDbId} = require("../utils/validateMongodb.js");
const {generateRefreshToken} = require("../config/refreshToken.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js")
const jwt = require("jsonwebtoken");
// const sendEmail = require('./email.js');
const sendMail = require("../utils/sendMail.js")
const {upload} = require("../multer.js")
const crypto = require("crypto");
const ErrorHandler = require('../utils/ErrorHandler.js');
const path = require("path")
const fs = require("fs")
const sendToken = require("../config/jwtToken.js")
const {createError} = require("../utils/error.js")
const cookieParser = require('cookie-parser')





const register = async(req,res,next) => {

    try{
        const hash = bcrypt.hashSync(req.body.password, 10);
        const newUser = new User({...req.body,
            password:hash,
        });
        await newUser.save();
        res.status(201).send("User has been created!")

    } catch (err){
        next(err)
    }

}


const login = async(req,res,next) => {

    try{
        const user = await User.findOne({username:req.body.username});
        // const err = new Error()
        // err.status = 404
        // err.message = "User not found"
        if(!user) return next(createError(404,"User not found"))

        const isCorrect = bcrypt.compareSync(req.body.password, user.password);
        if(!isCorrect) return next(createError(404,"Wrong Password or username"))

        const token = jwt.sign({
            id: user._id,
            isSeller: user.isSeller,
        },
        process.env.JWT_SECRET
        )

        const {password, ...info} = user._doc
        res.cookie("accessToken", token,{
            httpOnly:true,
        }).status(200).send(info)
    } catch (err){
        next(err)
    }

}

const logout = async(req,res,next) => {

    try{
        res.clearCookie("accessToken",{
            sameSite:"none",
            secure:true
        })
        .status(200)
        .send("User has been logged out")

    } catch (err){
        res.status(500).send("Something went wrong!!")
    }

}


module.exports = { register,login, logout }