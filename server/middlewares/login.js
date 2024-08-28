import { userController } from "../controllers/controllers.js";


const userLogin = async (req, res, next) => {

    try {
        
        const userDb = await userController.getUserByEmail(req.body.email);
        const result = await userController.validPassword( req.body.password, userDb);
    
        if (result){
            req.user = userDb;
        } else {
            req.user = null
        }

        

    } catch (err){
        req.user = null;
    }
    
    next();
};

export {
    userLogin
}