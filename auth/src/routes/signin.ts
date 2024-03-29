import { Password } from "./../services/password-operations";
import { BadRequestError } from "@arstickets/common";
import { requestValidator } from "@arstickets/common";
import { body } from "express-validator";
import express, { Request, Response, NextFunction } from "express";
import { User } from "../models/user";
import jwt from "jsonwebtoken";

const router = express.Router();
router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Please provide a password !"),
  ],
  requestValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    try {
      if (!existingUser) {
        throw new BadRequestError("Invalid credentials !");
      }
      const correctPassword = await Password.compare(
        existingUser.password,
        password
      );
      if (!correctPassword) {
        throw new BadRequestError("Invalid credentials !");
      }
      const userJwt = jwt.sign(
        {
          id: existingUser.id,
          email: existingUser.email,
        },
        process.env.JWT_KEY!
      );
      req.session = {
        jwt: userJwt,
      };
      res.status(200).send(existingUser);
    } catch (error) {
        next(error);
    }
  }
);

export { router as signinRouter };
