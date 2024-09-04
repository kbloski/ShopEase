import { webTokenManager } from "../../../utils/WebTokenManager.js"

export async function getOrdersCartForUser(){
    const userToken = webTokenManager.getToken();

    const result = await fetch(
        'http://localhost:3010/api/orders/user/cart',
        {
            method: 'GET',
            headers: {
                'authorization' : `Bearer ${userToken}`,
            }
        }
    )
    .then( response => {
        if (!response.ok) {
            const errData = response.json();
            throw new Error( errData.msg );
        }
        return response.json();
    })
    .catch( err => console.error( err) );

    return result.orders;
}

export async function getDeliveryMethods(){

    const result = await fetch(
        'http://localhost:3010/api/delivery/methods/all',
        {
            method: 'GET',
        }
    )
    .then( response => {
        if (!response.ok) {
            const errData = response.json();
            throw new Error( errData.msg );
        }
        return response.json();
    })
    .catch( err => console.error( err) );

   return result.deliveryMethods;
}