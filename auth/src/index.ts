import { errorHandler } from './middlewares/error-handler';
import express from 'express';
import { json, urlencoded } from 'body-parser';
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import mongoose from 'mongoose';
import 'express-async-errors';
const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.use(errorHandler);

const start = async () => {
    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/db', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        console.log('Connected to mongodb');
    } catch (error) {
        console.error('Error in db ', error);
    }
    app.listen(3000, () => {
        console.log('Listening to port 3000 !');
    });

}

start();