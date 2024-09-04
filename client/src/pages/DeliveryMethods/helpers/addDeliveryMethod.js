export async function addDeliveryMethod( deliveryMethodData ){
    const result = await fetch(
        'http://localhost:3010/api/delivery/methods/add',
        {
            method: 'POST', 
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify( deliveryMethodData)
        }
    )
    .then( response => {
        if (!response.ok) throw new Error( response.statusText );
    })
    .catch(err => console.error(err))
}   