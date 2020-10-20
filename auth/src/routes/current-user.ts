import { currentUser } from '@arstickets/common/build/common/src';
import express from 'express';

const router = express.Router();
router.get('/api/users/currentuser', currentUser, (req, res)=> {
   console.log('req ', req);
   res.send({currentUser: req.currentUser || null})

});

export { router as currentUserRouter};