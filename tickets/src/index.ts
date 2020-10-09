
import mongoose from 'mongoose';
import {app} from './app';
const start = async () => {
    if(!process.env.JWT_KEY){
        throw new Error('secret key must be provided');
    }
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