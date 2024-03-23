import express from 'express';
import { addCategory, 
deleteCategory, 
getAllCategory, 
getSingleCategory, 
updateCategory 
} from './category.controller.js';
import { validation } from '../../middleware/validation.js';
import { addCategVal, paramsIdVal, updateCategVal } from './category.validation.js';
import { uploadSingleFile } from '../../services/fileUploads/upload.js';
import subCategoryRouter from '../subcategory/subcategory.routes.js';
import { allowedTo, protectedRoutes } from '../auth/auth.controller.js';

const categoryRouter = express.Router();

categoryRouter.use('/:category/subcategories', subCategoryRouter);

categoryRouter
.route('/')
.post(protectedRoutes, allowedTo('admin'), uploadSingleFile('img'), validation(addCategVal), addCategory)
.get(getAllCategory)

categoryRouter
.route('/:id')
.get(validation(paramsIdVal), getSingleCategory)
.put(protectedRoutes, uploadSingleFile('img'), validation(updateCategVal) ,updateCategory)
.delete(protectedRoutes, validation(paramsIdVal), deleteCategory)

export default categoryRouter;