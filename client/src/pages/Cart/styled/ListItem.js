export function ListItem(props){
    const orderItem = props.order.orderItem;
    const product = props.order.product;
    
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
                    <button className="btn btn-danger">Delete</button>
                </div>
            </div>
        </li>
    )
}