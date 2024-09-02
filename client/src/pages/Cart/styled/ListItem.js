import { webTokenManager } from "../../../utils/WebTokenManager.js";

export function ListItem(props){
    const order = props.order;
    const orderItem = order.orderItem;
    const product = order.product;
    const onRemoveOrder = props.onRemoveOrder

    const removeOrder = async () => {
        const orderId = order.id;
        const token = webTokenManager.getToken();

        // Delete from db
        const result = await fetch(
            `http://localhost:3010/api/orders/${orderId}`,
            {
                method: 'DELETE',
                headers: {
                    'authorization' : `Bearer ${token}`,
                    'Content-type' : 'application/json'
                }
        })
        .then( response => {
            if (!response.ok) {
                const errData = response.json();
                throw new Error( errData.msg);
            }
            return response.json();
        })
        .catch(err => console.error(err));

        // Delete from list
        if ( result.deleted ) onRemoveOrder( order.id );
    }

    return (
        <li className="list-group-item">
            <div className="row">
                <div className="col-5">
                    <h5>
                        { product.name}
                    </h5>
                </div>
                <div className="col-2">
                    { orderItem.quantity }
                </div>
                <div className="col-2">
                    { product.price }
                </div>
                <div className="col-3">
                    <button className="btn btn-danger" onClick={ removeOrder }>Delete</button>
                </div>
            </div>
        </li>
    )
}