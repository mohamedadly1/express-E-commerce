import express from 'express';

import { checkEmail } from '../../middleware/checkEmail.js';
import { changePassword, protectedRoutes, signUp, signin } from './auth.controller.js';
import { validation } from '../../middleware/validation.js';
import { changePasswordVal, signInSchemaValidation, signUpSchemaValidation } from './auth.validation.js';




const authRouter = express.Router();

authRouter.post('/signup', validation(signUpSchemaValidation) ,checkEmail ,signUp)
authRouter.post('/signin',validation(signInSchemaValidation) ,signin)
authRouter.patch('/changePassword', protectedRoutes, validation(changePasswordVal) , changePassword)

export default authRouter;