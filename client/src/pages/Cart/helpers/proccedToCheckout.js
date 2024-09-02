import { basicUrl } from "../../../config/store.config.js";

export async function proceedToCheckout( orders , navigate ){
    // const sendMessage = () => {
    // }

    // for( const order of orders){
    //     console.log( order);
    // }

    // ----------* toDo - sprawdzenie czy na magazynie są dostępne produkty, czy ktoś nie uprzedził nas przed zakupem towaru, jeśli tak to wyrzucamy to w wiadomości, odświeżamy zawartość koszyku wraz z ustawieniem możliwej ilość towaru

    // const productDb = await fetch(
    //             `http://localhost:3010/api/products/${product.id}`,
    //             { method: 'GET' }
    //         )
    //         .then( response => {
    //             if (!response.ok) {
    //                 const errData = response.json();
    //                 throw new Error( errData.msg);
    //             }
    //             return response.json();
    //         })
    //         .catch( err => console.error( err ))


    navigate( basicUrl + '/checkout' );
}
