
export async function getOrders( token , setOrders ){
    const result = await fetch(
        'http://localhost:3010/api/orders/user/cart',
        {
            method: 'GET',
            headers: {
                'authorization' : `Bearer ${token}`,
                'Content-Type': 'application/json',
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
    .catch(err => console.error (err));

    if ( result ) setOrders( result.orders );
}