import { Link } from 'react-router-dom';
import storeConfig from '../../config/storeConfig.js'


export default function Navigation(props){
    const { basicUrl, storeName} = storeConfig;

    return(
        <nav>
            <ul>
                <li><Link to={ basicUrl }>{ storeName }</Link></li>
                <li><Link to={ basicUrl+ '/login'}>Login</Link></li>
                <li><Link to={ basicUrl + '/register'}>Register</Link></li>
            </ul>
        </nav>
    );
}