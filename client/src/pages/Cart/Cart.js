import { useState, useEffect } from "react";
import { webTokenManager } from "../../utils/WebTokenManager.js";



export default function Cart(props){
    const user = webTokenManager.getTokenData();
    const [orders, setOrders] = useState( [] );


    useEffect( ()=> {

    }, [user]);

    return (
        <div className="container p-2">
            <div className="row">
                <div className="col-12">
                    <h3>Twoje zamówienia:</h3>
                </div>

            </div>
        </div>
    )
}