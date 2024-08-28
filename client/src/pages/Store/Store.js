import { useEffect, useState } from "react";
import LiItem from "./styled/ListItem.js";
import { getProducts } from "./helpers/useEffectHelper.js";

export default function Store(props){
    const [productsArr, setProductsArr] = useState([]);

    useEffect(() => {
        getProducts(setProductsArr);
    }, []);


    return(
        <section id="store">
            <h1>Produkty</h1>
            <ul className="list-unstyled">
                { productsArr.map( product => {
                    return <LiItem key={product.id} product={ product } />
                }) }
            </ul>
        </section>
    );
}