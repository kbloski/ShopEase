import { webTokenManager } from "../../../utils/WebTokenManager.js";

export async function getAddressDb(){
    const userData = webTokenManager.getTokenDecoded().data;

    const address = await fetch(
        `http://localhost:3010/api/addresses/for-user/${userData.id}`,
        {
            method: 'GET'
        }
    )
    .then( response => {
        if (!response.ok) throw new Error('Err address data');
        return response.json();
    })
    .catch(err => console.error(err ))

    return address;
}