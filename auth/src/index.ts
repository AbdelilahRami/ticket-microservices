import { errorHandler } from './middlewares/error-handler';
import express from 'express';
import { json, urlencoded } from 'body-parser';
import {currentUserRouter} from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
const app = express();

app.use(json());
app.use(urlencoded({extended: true}));
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.use(errorHandler);


app.listen(3000, ()=> {
    console.log('Listening to port 3000 !!!');
})