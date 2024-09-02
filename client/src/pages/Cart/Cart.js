import { useState, useEffect } from "react";
import { webTokenManager } from "../../utils/WebTokenManager.js";
import { getOrders } from "./helpers/useEffectHelper.js";
import { ListItem } from "./styled/ListItem.js";



export default function Cart(props){
    const userToken = webTokenManager.getToken();

    const [priceSummary, setPriceSummary] = useState(0);
    const [orders, setOrders] = useState( [] );

    useEffect(  ()=> {
        getOrders( userToken , setOrders );

        return;
    }, [userToken]);

    useEffect( () => {
        const newPriceSummary = orders.reduce( (total, order) => {
            const productPrice = Number(order.product.price);
            const quantity = Number(order.orderItem.quantity)
            return total + ( productPrice * quantity); 
        }
        , 0);


        setPriceSummary( newPriceSummary.toFixed(2) );
    }, [orders])

    const updateOrder = (id, updateData) => {
        setOrders( prevOrders => prevOrders.map( order => order.id === id ? { ...order, ...updateData} : order
        ))
    }

    const removeOrder = (id) => {
        setOrders( prevOrders => prevOrders.filter( order => order.id !== id));
    };




    
    if (!userToken) {
        return (
            <div className="container">
                <h1>You must log in to view the cart.</h1>
            </div>
        );
    };
    
    return (
        <div className="container p-2">
            <div className="row">
                <div className="col-12">
                    <h3>Twój koszyk:</h3>
                    <section id="orders">
                        <ul className="list-group list-group-flush">
                            { orders.map( (order, index) => {
                                return <ListItem key={order.id} order={order} onRemoveOrder={removeOrder} onUpdateOrder={updateOrder} />
                            })}
                        </ul>
                    </section>
                    <section id="paymentSummary">
                        <div className="row p-3">
                            <div className="col-8 text-end">
                                Podsumowanie:
                            </div>
                            <div className="col-4">
                                <b>{priceSummary}</b> zł
                            </div>
                        </div>
                    </section>
                    
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-success">DOSTAWA I PŁATNOŚĆ</button>
                    </div>
                </div>
            </div>
        </div>
    )
}