import { userController } from "../controllers/controllers.js";
import { webTokenManager } from "../utility/tokenManager.js";

export async  function authorizeHeaderToken(req, res, next){
    try {
        const authHeader = req?.headers['authorization'];
    
        if ( authHeader ){
            const token = authHeader.split(" ")[1];
            if (!token) res.status(401).json({msg: '401 Unauthorized', created: false});
            
            const tokenData = webTokenManager.verifyWebToken( token );
            
            const userDb = await userController.getById( tokenData.decoded.id )
    
            req.user = userDb;
        } else {
            req.user = null;
        }
    } catch (err){
        console.error(err)
    }
    next();
}
