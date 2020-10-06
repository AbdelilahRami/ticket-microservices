import { errorHandler } from './middlewares/error-handler';
import express from 'express';
import { json, urlencoded } from 'body-parser';
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import 'express-async-errors';
import coookieSession from 'cookie-session';
const app = express();

app.set('trust proxy', true);
app.use(coookieSession({
    secure: process.env.NODE_ENV !== 'test',
    signed: false
}))

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.use(errorHandler);

export {app};