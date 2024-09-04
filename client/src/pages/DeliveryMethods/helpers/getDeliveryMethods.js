
export async function getDeliveryMethods(){
    const result = await fetch(
        "http://localhost:3010/api/delivery/methods/all",
        {
            method: 'get'
        }
    )
    .then( resposne => {
        if (!resposne.ok) throw new Error( resposne.statusText);
        return resposne.json();
    })
    .catch( err => console.error(err))

    return result.deliveryMethods;
}