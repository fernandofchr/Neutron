import User from '../Models/user.js'
import bcrypy from "bcryptjs"
import { createAccessToken } from '../Libs/jwt.js'


export const register = async (req, resp) => {
    const { email, password, username } = req.body
    try {

        const hashPassword = await bcrypy.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashPassword
        })
        const userSaved = await newUser.save()
        const token = await createAccessToken({id: userSaved._id})
        resp.cookie("token:", token)
        resp.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt
        })
    } catch (error) {
        console.log(error);
        resp.status(500).json({"message":error.message})
    }
}

export const login = async (req, resp) => {
    const { email, password} = req.body
    try {
        const userFound= await User.findOne({email})

        if(!userFound)return resp.status(400).json({message:" User not found"})

        const isMatch = await bcrypy.compare(password,userFound.password);

        if(!isMatch)return resp.status(400).json({message: "Incorrect Password"});

        const token = await createAccessToken({id: userFound._id})
        resp.cookie("token:", token)
        resp.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
        })
    } catch (error) {
        console.log(error);
        resp.status(500).json({"message":error.message})
    }
}

export const logout= (req, resp)=>{
    resp.cookie('token','',{
        expires: new Date(0)
    })
    return resp.sendStatus(200)
}

export const profile=(req, resp)=>{
    resp.send('profile');
}