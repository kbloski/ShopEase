import { Link } from 'react-router-dom';
// import { useState } from 'react';

import { storeName, basicUrl} from '../../config/store.config.js'
import { webTokenController } from '../../middlewares/WebTokenController.js';

function capitalizeFirstLetter(str){
    if (str.length === 0) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export default function Navigation(props){

    return(
        <nav>
            <ul>
                { !webTokenController.getToken() && (
                    <div>
                        <li><Link to={ basicUrl+ '/login'}>Login</Link></li>
                        <li><Link to={ basicUrl + '/register'}>Register</Link></li>
                    </div>
                ) }

                <li><Link to={ basicUrl }>
                    { capitalizeFirstLetter( storeName.toUpperCase() ) }
                </Link></li>
                <li>
                    <Link to={ basicUrl + '/product/add'}>Add product</Link>
                </li>
                <li>
                    <Link to={basicUrl + '/store'}>Store</Link>
                </li>
            </ul>
        </nav>
    );
}