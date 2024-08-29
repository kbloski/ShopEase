import { webTokenManager } from "../../../utils/WebTokenManager.js";


export function submitReviewAdd(
    event,
    formData,
    productId
) 
{
    event.preventDefault();

    const token = webTokenManager.getToken();
    fetch(
        `http://localhost:3010/api/reviews/add-to-product/${productId}`,
        {
            method: 'POST',
            headers: {
                'authorization' : `Bearer ${token}`,
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify( formData )
        }
    )
    .then( response => {
        if ( !response.ok ) throw new Error('Error send review');
        return response.json()
    })
    .then( data => {
        console.log( data );
    }).catch( err => console.error(err) );
}   