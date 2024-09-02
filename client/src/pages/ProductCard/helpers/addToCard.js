import { webTokenManager } from "../../../utils/WebTokenManager.js";

export function addToCard(event,){
    event.preventDefault();
    
    const form = event.target;
    
    const productId = form.querySelector('input[name="productId"]').value;
    const quantity = form.querySelector('input[name="quantity"]').value;
    

    const token = webTokenManager.getToken();
    fetch( 
        'http://localhost:3010/api/orders/item/add',
        {
            method: 'POST',
            headers: {
                'authorization' : `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( {
                productId: productId,
                quantity: quantity 
            })
        }
    )
    .then( async response => {
        if ( !response.ok) {
            const errData = await response.json();
            throw new Error(errData.msg);
        }
        return response.json()
    })
    .then(
        data => {
            console.log( data );
        }
    )
    .catch( err => console.error(err.message) );

}