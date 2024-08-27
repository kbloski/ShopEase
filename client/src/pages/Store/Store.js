import { useEffect, useState } from "react";
import LiItem from "./styled/ListItem.js";

export default function Store(props){
    const [productArr, setProductArr] = useState([]);

    useEffect(() => {
        async function getProducts(){

            const products = await fetch("http://localhost:3010/api/products/get/all", {method: 'GET'})
            .then( response => { 
                if (!response.ok) throw new Error('Error server - http://localhost:3010/api/product/get/all');
    
                return response.json();
            })
            
            setProductArr( products );
        }

        getProducts();

    }, []);



    return(
        <section id="store">
            <h1>Produkty</h1>
            <ul className="list-unstyled">
                { productArr.map( product => {
                    return <LiItem key={product.id} product={ product } />
                }) }
            </ul>
        </section>
    );
}