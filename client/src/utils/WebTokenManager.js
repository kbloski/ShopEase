import { jwtDecode } from 'jwt-decode';
import { TOKEN_KEY } from '../config/constans.js';


class WebTokenManager
{
    getToken()
    {
        return localStorage.getItem(TOKEN_KEY);
    }

    getTokenData()
    {
        const token = localStorage.getItem(TOKEN_KEY);
        if (!token) return { valid: false , message: 'No token found'};
        
        try {
            const decoded = jwtDecode( token )

            if ( decoded.exp * 1000 < Date.now() ) return {
                valid: false,
                msg: 'Token expired'
            }

            return {
                valid: true,
                data: decoded
            };
        } catch (err){
            return { valid: false, message: 'Token decoding failed'};
        }
    }

    setToken( token ){
        localStorage.setItem(TOKEN_KEY, token);
    }

    clearToken(){
        localStorage.setItem( TOKEN_KEY, '')
    }

}

const webTokenManager = new WebTokenManager();

export {
    webTokenManager
}