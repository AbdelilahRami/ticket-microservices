import mongoose from 'mongoose';

import {app} from './app';

const start = async () => {
    if(!process.env.JWT_KEY){
        throw new Error('secret key must be provided');
    }
    if(!process.env.MONGO_URI){
        throw new Error('MONGO_URI must be defined !')
    }

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
    } catch (error) {
        console.error('Error in db ', error);
    }
    app.listen(3000, () => {
        console.log('Listening to port 3000 !');
    });
}

start();