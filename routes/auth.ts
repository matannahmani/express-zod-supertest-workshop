import express, { Request, Response } from 'express';
import { authenticateRequest } from '../middlewares/authenticateRequest';
import { z } from 'zod';
import { UserDB } from '../models/User';

const router = express.Router();

router.get('/me',authenticateRequest, (req: Request, res: Response) => {
    res.json(req.user);
});


const loginBodyZod = z.object({
    _id: z.string(),
    password: z.string()
}).strict();

router.post('/login', (req: Request, res: Response) => {
    const body = loginBodyZod.safeParse(req.body);
    if (!body.success)
    return res.status(400).json({ message: 'Invalid body' });
    const {data} = body;
    const user = UserDB.find(user => user._id === data._id);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    if (!user.validatePassword(data.password)) {
        return res.status(401).json({ message: 'Invalid password' });
    }
    const token = user.generateToken();
    res.json({ token });
});

export {router as authRouter};