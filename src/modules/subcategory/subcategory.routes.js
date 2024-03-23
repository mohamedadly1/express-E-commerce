import express from 'express';
import { validation } from '../../middleware/validation.js';
import { 
addSubCategory,
deleteSubCategory, 
getAllSubCategory, 
getSingleSubCategory, 
updateSubCategory 
} from './subcategory.controller.js';
import { 
addSubCategVal,
paramsIdVal,
updateSubCategVal, 
} from './subcategory.validation.js';


const subCategoryRouter = express.Router({mergeParams: true});

subCategoryRouter
.route('/')
.post(validation(addSubCategVal), addSubCategory)
.get(getAllSubCategory)

subCategoryRouter
.route('/:id')
.get(validation(paramsIdVal), getSingleSubCategory)
.put(validation(updateSubCategVal) ,updateSubCategory)
.delete(validation(paramsIdVal), deleteSubCategory)

export default subCategoryRouter;