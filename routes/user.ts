import express, { Request, Response } from 'express';
import { UserDB } from '../models/User';

const router = express.Router();


router.get('/:id', (req: Request, res: Response) => {
    const user = UserDB.find(user => user._id === req.params.id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

export {router as userRouter};