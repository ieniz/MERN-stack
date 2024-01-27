import express from 'express';
import mongose from 'mongoose';  
import dotenv from 'dotenv';
dotenv.config();

mongose.connect(process.env.MONGO).then(() =>{
    console.log('Connected to MongoDB');

})

const app = express();

app.listen(3000, ()=> {

    console.log('Server is running on port 3000');
});