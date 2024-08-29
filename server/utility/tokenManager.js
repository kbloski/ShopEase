import jwt from "jsonwebtoken";
import { userController } from '../controllers/controllers.js';

class WebTokenManager {
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
        if (!token) return { valid: false };

        try {
            const decoded = jwt.verify( token, this.SECRET_KEY);
            return { valid: true, decoded};
        } catch (err){
            return { valid: false, error: 'Invalid token', details: err.message};
        }
    }
};
const webTokenManager = new WebTokenManager();



export {
    webTokenManager,
}