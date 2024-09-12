import { Link } from 'react-router-dom';
// import { basicUrl, storeName } from '../../config/store.config.js';
import Navigation from '../Navigation/Navigation.js';
import style from './header.module.scss';


export default function Header(props){
    return(
        <div className={style.header + ' p-2 d-flex justify-content-between'}>
            <Navigation />
            <h1>
                <Link to={ '/ '} className={style['brand-title']}>
                    {/* {storeName} */}
                </Link>
            </h1>
        </div>
    )
}