import { userController } from "../controllers/controllers.js";


const userLogin = async (req, res, next) => {
    const userDb = await userController.getUserByEmail(req.body.email);
    const result = await userController.validPassword( req.body.password, userDb);

    if (result) req.user = userDb;
    
    next();
};

export {
    userLogin
}