import { userController } from "../controllers/controllers.js";
import { sendError, sendSuccess } from "../utility/errorUtils.js";


const userLogin = async (req, res, next) => {

    try {

        const loginData = req.body;
        
        if ( loginData.email) loginData.email = loginData.email.trim();
        if ( loginData.password) loginData.password = loginData.password.trim();

        if (!loginData.email){
            return sendError(req, res, 400, '400 Bad Request: Email has no value. Please provide email. ');
        }

        if (!loginData.password){
            return sendError(req, res, 400, '400 Bad Request: Password has no value. Please provide password. ');
        }
        
        const userDb = await userController.getUserByEmail(req.body.email);
        const result = await userController.validPassword( req.body.password, userDb);
    
        if (result){
            req.user = userDb;
        } else {
            req.user = null
        }

        return next();
    } catch (err){
        sendError( req, res, 500, '500 Internal Server Error');
    }
};

export {
    userLogin
}