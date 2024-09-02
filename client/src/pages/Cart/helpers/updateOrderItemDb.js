import { webTokenManager } from "../../../utils/WebTokenManager.js";

export const updateOrderItemDb = async (id, orderItemData) => {
    await fetch(
        `http://localhost:3010/api/orders/items/${id}`,
        {
            method: 'PUT',
            headers: {
                'Authorization' : `Bearer ${webTokenManager.getToken()}`,
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify( orderItemData)
        }
    )
    .then( response => {
        if (!response.ok) {
            const errData = response.json();
            throw new Error( errData.msg );
        }
        return response.json();
    })
    // .then( data => console.log( data ))
    .catch (err => console.error(err));
} 