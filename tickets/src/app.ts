import express from 'express';
import { json, urlencoded } from 'body-parser';

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


export {app};