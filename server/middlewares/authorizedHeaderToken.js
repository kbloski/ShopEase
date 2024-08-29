import { userController } from "../controllers/controllers.js";
import { sendError } from "../utility/errorUtils.js";
import { webTokenManager } from "../utility/tokenManager.js";

export async  function authorizeHeaderToken(req, res, next){
    try {
        const authHeader = req?.headers['authorization'];
    
        if ( authHeader ){
            const token = authHeader.split(" ")[1];
            
            const tokenData = webTokenManager.verifyWebToken( token );

            if(!tokenData.valid) { 
                req.user = null;
                return next();
            }

            const userDb = await userController.getById( tokenData.decoded.id )
            req.user = userDb;
        } else {
            req.user = null;
        }

        return next();
    } catch (err){
        console.error(err);
        sendError( req, res, 500, '500 Internal Server Error');
    }
    
}
