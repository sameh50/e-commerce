import { Router } from "express";

import { validate } from "../../middleware/validate.js";
import { user_admin_val } from "./user-admin.validation.js";
import { adduser, delete_user, findAll_users, findSpecific_user, update_user } from "./user-admin.controller.js";
import { EmailExist } from "../../middleware/EmailExist.js";
const user_adminRouter = Router()

//add user(admin)
user_adminRouter.post('/add-user_admin', validate(user_admin_val),EmailExist ,adduser)
//find users
user_adminRouter.get('/findAlluser_admin', findAll_users)


//find specific brand
user_adminRouter.get('/finduser_admin/:id', findSpecific_user)
// update brand
user_adminRouter.put('/update-user_admin/:id', update_user)
// delete brand
user_adminRouter.delete('/delete-user_admin/:id', delete_user)


export default user_adminRouter
