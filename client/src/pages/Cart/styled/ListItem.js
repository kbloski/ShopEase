import { useState, useEffect } from "react";
import { removeOrderDb } from "../helpers/removeOrder.js";
import { updateOrderItemDb } from "../helpers/updateOrderItemDb.js";

export function ListItem(props) {
    const order = props.order;
    const orderItem = order.orderItem;
    const product = order.product;
    const onRemoveOrder = props.onRemoveOrder;
    const onUpdateOrder = props.onUpdateOrder;
    const [quantity, setQuantity] = useState(orderItem.quantity);

    const removeOrder = async () => {
        const deleted = await removeOrderDb(order.id);
        if (deleted) onRemoveOrder(order.id);
    };

    const incrementQuantity = async () => {
        if (quantity >= product.available_stock) return; 
        setQuantity(value => value + 1); 
    };

    const decrementQuantity = () => {
        if (quantity <= 1) return;  
        setQuantity(value => value - 1); 
    };

    // useEffect do śledzenia zmian `quantity`
    useEffect(() => {
        if (quantity !== orderItem.quantity) { 
            const updatedOrder = {...orderItem, ...{quantity: quantity} }
            onUpdateOrder(order.id, { orderItem: updatedOrder }); 

            updateOrderItemDb( orderItem.id, { quantity: quantity });
        }
    }, [quantity, orderItem.quantity, order.id, onUpdateOrder, orderItem]);  

    return (
        <li className="list-group-item">
            <div className="row">
                <div className="col-4">
                    <h5>
                        {product.name}
                    </h5>
                </div>
                <div className="col-3">
                    <ul className="list-group list-group-horizontal">
                        <button className="list-group-item" onClick={decrementQuantity}>-</button>
                        <li className="list-group-item">{quantity}</li>
                        <button className="list-group-item" onClick={incrementQuantity}>+</button>
                    </ul>
                </div>
                <div className="col-2">
                    {product.price} zł
                </div>
                <div className="col-3">
                    <button className="btn btn-danger" onClick={removeOrder}>Delete</button>
                </div>
            </div>
        </li>
    );
}
