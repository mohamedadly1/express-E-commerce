import multer from "multer";
import { v4 as uuidv4 } from "uuid";

import mongoose from "mongoose";
import { AppError } from "../../utils/AppError.js";



const fileUpload = () => {
  const storage = multer.diskStorage({
    destination : (req , file, cb) => {
      cb(null, 'uploads/')
    },
    filename: (req , file, cb) => {
      cb(null, new mongoose.Types.ObjectId + '-' + file.originalname)
    }
  });

  function fileFilter(req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      // To accept the file pass `true`, like so:
      cb(null, true);
    } else {
    // You can always pass an error if something goes wrong:
    cb(new AppError('images only', 409) , false);
    }
  }

  const upload = multer({ storage , fileFilter });
  return upload
}

export const uploadSingleFile = fieldName => fileUpload().single(fieldName)
export const uploadArrayOfFiles = fieldName =>  fileUpload().array(fieldName,10)
export const uploadFields = fields =>  fileUpload().fields(fields)


