import * as express from 'express';
import { userSignUp } from '../controllers/user-controller';
const router = express.Router();

router.post('/signup', userSignUp);
// router.post('/login', userLogin);
// router.get('/user', verifyToken, getUser);

export default router;
