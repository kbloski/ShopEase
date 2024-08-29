import { userController } from "../controllers/controllers.js";
import { sendError, sendSuccess } from "../utility/errorUtils.js";


const userLogin = async (req, res, next) => {

    try {
        let { email, password } = req.body;
        email = email.trim();
        password = password.trim();

        if (!email){
            sendError(req, res, 400, '400 Bad Request: Email has no value. Please provide email. ');
        }

        if (!password){
            sendError(req, res, 400, '400 Bad Request: Password has no value. Please provide password. ');
        }
        
        const userDb = await userController.getUserByEmail(req.body.email);
        const result = await userController.validPassword( req.body.password, userDb);
    
        if (result){
            req.user = userDb;
        } else {
            req.user = null
        }
    } catch (err){
        sendError( req, res, 400, '500 Internal Server Error');
    }
    next();
};

export {
    userLogin
}