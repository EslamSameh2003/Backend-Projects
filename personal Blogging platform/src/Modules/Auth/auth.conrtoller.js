import {Router} from 'express';
import {login,signup} from './auth.service.js';
import {connecionDB ,Test_connct}from '../../DB/connection.js';
const router = Router();


router.post('/login',login);
router.post('/signup',signup);


export default router;