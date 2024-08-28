import { jwtDecode } from 'jwt-decode';
import { TOKEN_KEY } from '../config/constans.js';


class WebTokenController
{
    getToken()
    {
        return localStorage.getItem(TOKEN_KEY);
    }

    getTokenData()
    {
        const token = !localStorage.getItem(TOKEN_KEY);
        if ( !token || token.split('.').length !== 3) throw new Error('Invalid JWT token');

        return jwtDecode( token );
    }

    setToken( token ){
        localStorage.setItem(TOKEN_KEY, token);
    }

    clearToken(){
        localStorage.setItem( TOKEN_KEY, '')
    }

}

const webTokenController = new WebTokenController();

export {
    webTokenController
}