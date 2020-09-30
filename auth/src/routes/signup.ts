import { DataBaseConnectionError } from './../errors/error-database-connection';
import { RequestValidationError } from './../errors/request-validation-errors';
import express, { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';

const router = express.Router();
router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage('Email must be valid'),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 length'),
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const {email, password} = req.body;
    const userExits = await User.findOne({email});
    if(userExits){
      try{
      
      throw new BadRequestError('User already exists !');
      } catch(error){
        next(error);
      }

    }

    const user = User.build({email, password});
    await user.save();
    res.status(201).send(user);

  }
);

export { router as signupRouter };
