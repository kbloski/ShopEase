import { Link } from 'react-router-dom';
import storeConfig from '../../config/storeConfig.js'

function capitalizeFirstLetter(str){
    if (str.length === 0) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export default function Navigation(props){
    const { basicUrl, storeName} = storeConfig;

    return(
        <nav>
            <ul>
                <li><Link to={ basicUrl }>
                    { capitalizeFirstLetter( storeName.toUpperCase() ) }
                </Link></li>
                <li><Link to={ basicUrl+ '/login'}>Login</Link></li>
                <li><Link to={ basicUrl + '/register'}>Register</Link></li>
            </ul>
        </nav>
    );
}