import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import { generateToken } from '../utils/generateToken.js';


export const authUser = asyncHandler(async(req, res)=>{
    const { email, password } = req.body

    const user = await User.findOne({email})

    if(user && ( await user.matchPassword(password))){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:generateToken(user._id),
        })
    }else{
        res.status(401)
        throw new Error("Email or password is invalid.")
    }
})


export const newUser = asyncHandler(async(req, res)=>{
    const { name, email, password } = req.body
    
    const userExist = await User.findOne({email})
    
    if(userExist){
        res.status(400)
        throw new Error('User already exixts')
    }
    
    const user = await User.create({
        name,
        email,
        password,
    })
    
    
    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid user!')
    }

})

export const updateUserProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id)
    // const user = await User.findById(req.user._id)

    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if(req.body.password){
            user.password = req.body.password
        }

        const updatedUser = await user.save()

        res.json({
            _id:updatedUser._id,
            name:updatedUser.name,
            email:updatedUser.email,
            isAdmin:updatedUser.isAdmin,
            token:generateToken(updatedUser._id)
        })
    }
})



export const adminUpdateUserProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id)

    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin
        // console.log(req.body.isAdmin)

        const updatedUser = await user.save()

        res.json({
            _id:updatedUser._id,
            name:updatedUser.name,
            email:updatedUser.email,
            isAdmin:updatedUser.isAdmin,
        })
    }
})



export const getUserProfile = asyncHandler(async(req, res) => {
    if(req.user){
        res.send(req.user)
    }else{
        res.status(404)
        throw new Error('User not found')
    }
})



export const getUserProfileAdmin = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id)
    if(user && req.user.isAdmin){
        // console.log(user)
        res.send(user)
    }else{
        res.status(404)
        throw new Error('User not found')
    }
})


export const adminGetUsers = asyncHandler(async(req, res) => {
    const users = await User.find({})

    if(users){
        res.send(users)
    }else{
        res.status(404)
        throw new Error('User not found')
    }
})



export const adminDeleteUser = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id)

    if(user){
        await user.remove()
        res.send("true")
    }else{
        res.status(404)
        throw new Error('User not found')
    }
})



// export const adminUpdateUser = asyncHandler(async(req,res) => {
//     const user = await User.find
// })
