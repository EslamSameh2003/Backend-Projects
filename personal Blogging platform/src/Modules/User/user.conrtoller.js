import {Router} from 'express';
import {profile,update,deleteUser} from './user.service.js';
import {connecionDB ,Test_connct}from '../../DB/connection.js';
import User from '../../DB/models/user.model.js';

const router = Router();


router.get("/profile/:id",profile);
router.put("/:id/update",update);
router.delete("/:id/delete",deleteUser);




export default router;


