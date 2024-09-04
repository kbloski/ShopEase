import { webTokenManager } from "../../../utils/WebTokenManager.js"

export async function submitAddAddress( address ){
    const userToken = webTokenManager.getToken();
    // console.log( address )

    await fetch(
        'http://localhost:3010/api/addresses/create-for-user',
        {
            method: 'POST',
            headers: {
                'authorization' : `Bearer ${userToken}`,
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify( address )
        }
    )
    .then ( response => {
        const data = response.json();
        if (!response.ok) throw new Error( data.msg);
        return data; 
    })
    .catch(err => {
        console.error(err)
    })
}