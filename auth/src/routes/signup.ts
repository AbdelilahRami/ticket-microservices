import { requestValidator } from "@arstickets/common";

import express, { Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import { User } from "../models/user";
import { BadRequestError } from "@arstickets/common";
import jwt from "jsonwebtoken";

const router = express.Router();
router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 length"),
  ],
  requestValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const userExits = await User.findOne({ email });
    if (userExits) {
        throw new BadRequestError("User already exists !");
    }
    const user = User.build({ email, password });
    await user.save();

    const userJwt = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_KEY!
    );
      console.log('USER JWT ', userJwt);
    req.session = {
      jwt: userJwt,
    };
    console.log('req.session ', req.session.jwt);
    res.status(201).send(user);
  }
);

export { router as signupRouter };
