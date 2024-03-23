import express from 'express';
import { addUser, deleteUser, getAllUser, getSingleUser, updateUser } from './user.controller.js';
import { addUserVal, paramsIdVal, updateUserVal } from './user.validation.js';
import { validation } from '../../middleware/validation.js';
import { checkEmail } from '../../middleware/checkEmail.js';


const userRouter = express.Router();

userRouter
.route('/')
.post(validation(addUserVal), checkEmail, addUser)
.get(getAllUser)

userRouter
.route('/:id')
.get(validation(paramsIdVal), getSingleUser)
.put(validation(updateUserVal) ,updateUser)
.delete(validation(paramsIdVal), deleteUser)

export default userRouter;