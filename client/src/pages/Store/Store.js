// import { useState } from "react";
import ListItem from "./styled/ListItem.js";

export default function Store(props){


    return(
        <section id="store">
            <h1>Produkty</h1>
            <ul className="list-unstyled">
                <ListItem pictureSrc={''} name={"Produkt1"} price={3.99}/>
            </ul>
        </section>
    );
}