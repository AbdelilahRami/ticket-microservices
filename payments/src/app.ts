import { currentUser } from '@arstickets/common';
import express from 'express';
import { json, urlencoded } from 'body-parser';
import 'express-async-errors';
import coookieSession from 'cookie-session';
import { paymentRouter } from './routes/create-payment';

const app = express();

app.set('trust proxy', true);
app.use(json());

app.use(
  coookieSession({
    secure: process.env.NODE_ENV !== 'test',
    signed: false,
  })
);
app.use(currentUser);
app.use(paymentRouter);
app.use(urlencoded({ extended: true }));

export { app };
