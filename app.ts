import bodyParser from 'body-parser';
import express, { Request, Response, NextFunction } from 'express';
import { userRouter } from './routes/user';
import dotenv from 'dotenv';
import { authRouter } from './routes/auth';
dotenv.config();
export const app = express();
app.use(bodyParser.json());
app.use('/user',userRouter);

app.use('/auth',authRouter)

app.get('/welcome', (req: Request, res: Response, next: NextFunction) => {
    res.json({ message: 'Welcome to the API' });
});

app.listen('7000', () => {
    console.log(`
  ################################################
  Server listening on port: 7000
  ################################################
`);
});

export default app;