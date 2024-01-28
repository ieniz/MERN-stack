import express from 'express';
import mongose from 'mongoose';  
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
dotenv.config();

mongose.connect(process.env.MONGO).then(() =>{
    console.log('Connected to MongoDB');

})

const app = express();
app.use(express.json());

app.listen(3000, ()=> {

    console.log('Server is running on port 3000');
});

app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);