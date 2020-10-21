import express from "express";
import { json, urlencoded } from "body-parser";
import "express-async-errors";
import coookieSession from "cookie-session";
import { showAllOrdersRouter } from "./routes/index";
import { createOrderRouter } from "./routes/create-order";
import { deleteOrderRouter } from "./routes/delete-order";
import { showOrderRouter } from "./routes/show-order";
import { errorHandler, currentUser } from '@arstickets/common';
const app = express();

app.set("trust proxy", true);
app.use(json());

app.use(
  coookieSession({
    secure: process.env.NODE_ENV !== "test",
    signed: false,
  })
);
app.use(currentUser);
app.use(showAllOrdersRouter);
app.use(createOrderRouter);
app.use(deleteOrderRouter);
app.use(deleteOrderRouter);
app.use(showOrderRouter);
app.use(urlencoded({ extended: true }));
app.use(errorHandler);

export { app };
