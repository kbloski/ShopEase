import { webTokenManager } from "../utility/tokenManager.js";

export function authorizeHeaderToken(req, res, next){
    const authHeader = req?.headers['authorization'];

    if ( authHeader ){
        const token = authHeader.split(" ")[1];
        
        if (!token) res.status(401).json({msg: '401 Unauthorized', created: false});
        
        const tokenData = webTokenManager.verifyWebToken( token );
    
        if ( !tokenData.valid ) res.status( 401 ).json( {msg: '401 Unauthorized'+tokenData.details})
    
        req.user = tokenData.decoded.id;
    } else {
        req.user = {};
    }

    console.log( req.user)

    next();
}
