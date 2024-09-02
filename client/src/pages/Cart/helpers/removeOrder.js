import { webTokenManager } from "../../../utils/WebTokenManager.js";

export async function removeOrderDb(orderId ){
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

    return result.deleted;
}