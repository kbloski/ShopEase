export function OrderBar(props){
    const order = props.order;
    const orderItem = order.orderItem;
    const product = order.product;
    
    
    return <div className="row m-1 ms-0 p-1 border border-dark">
        <div className="col-8">
            { product.name }
        </div>
        <div className="col-2"> 
            { orderItem.quantity }
        </div>
        <div className="col-2 text-end"> 
            { product.price * orderItem.quantity } zł
        </div>
    </div>
}