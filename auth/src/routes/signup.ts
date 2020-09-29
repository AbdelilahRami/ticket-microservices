import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";

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
  (req: Request, res: Response) => {
      console.log('begin');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
       throw Error('Invalid email or password !');
    }

    const { email, password } = req.body;
    throw Error('Something is wrong in database');
    return res.send({some: 'toto'});
  }
);

export { router as signupRouter };
