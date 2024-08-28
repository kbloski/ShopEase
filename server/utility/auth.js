import jwt from "jsonwebtoken";
import { userController } from '../controllers/controllers.js';

class WebTokenController {
    constructor(){
        this.SECRET_KEY = 'superSecretKeyForTokens';

    };

    createWebToken(
        payloadData,
        options = {
            expiresIn: '10y'
        }
    ){
        const token = jwt.sign(payloadData, this.SECRET_KEY, options);
        return token;
    };

    verifyWebToken(token){
        if (!token) return false;

        try {
            const decoded = jwt.verify( token, this.SECRET_KEY);
            return decoded;
        } catch (err){
            return false;
        }
    }
};
const webTokenController = new WebTokenController();

const authenticateToken = async (req, res, next) => {

    const result = webTokenController.verifyWebToken( req.token );
    if (!result){
        res.statusCode = 403;
        res.send('403 Forbidden, maybe you are logged out!')
    }
        
    next();
};

export {
    webTokenController,
    authenticateToken
}