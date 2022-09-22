import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { UserZod, UserDB } from '../models/User';

export const authenticateRequest = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    let valid = false;
    try{
        if (token) {
            const tokenBody = await jwt.verify(token, process.env.JWT_SECRET)
            const body = UserZod.strip().pick({_id: true}).parse(tokenBody);
            const user = UserDB.find(user => user._id === body._id);
            if (user) {
                req.user = user;
                valid = true;
            }
        }
    }catch(err){
        console.log(err)
        valid = false;
    }finally{
        if (valid) {
            next();
        } else {
            res.status(401).json({ message: 'Unauthorized' });
        }
    }
}