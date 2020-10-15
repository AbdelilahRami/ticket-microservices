import express from 'express';
import { json, urlencoded } from 'body-parser';
import 'express-async-errors';
import coookieSession from 'cookie-session';
import {createTicketRouter} from './routes/create-ticket';
import {currentUser ,errorHandler} from '@arstickets/common';
import {showTicketRouter} from './routes/show-ticket';
import {updateticketRouter} from './routes/update-ticket';
const app = express();

app.set('trust proxy', true);
app.use(json());

app.use(coookieSession({
    secure: process.env.NODE_ENV !== 'test',
    signed: false
}));
app.use(currentUser);
app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(updateticketRouter);
app.use(urlencoded({ extended: true }));
app.use(errorHandler);


export {app};