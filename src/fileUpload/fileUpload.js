import multer from "multer";
import { v4 as uuidv4 } from 'uuid';
import { AppError } from "../../utilities/appError.js";



const fileUpload = (foldername) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `uploads/${foldername}`)
        },
        filename: function (req, file, cb) {

            cb(null, uuidv4() + '-' + file.originalname)
        }
    })

    function fileFilter(req, file, cb) {

        if (file.mimetype.startsWith('image')) {

            cb(null, true)


        } else {



            cb(new AppError('image only', 401), false)



        }
    }
    const upload = multer({ storage, fileFilter })

    return upload
}

export const fileUploadSingle = (fieldName,foldername) => {


    return fileUpload(foldername).single(fieldName)

}

export const fileUploadMany = (arrayOFfields,foldername) => {

    return fileUpload(foldername).fields(arrayOFfields)

}