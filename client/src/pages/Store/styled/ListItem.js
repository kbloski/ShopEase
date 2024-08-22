import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ListItem(props){
    const [pictureUrl, setPictureUrl] = useState('/images/default-product-img.png')

    useEffect( ()=>{
        async function getPicture(productId){
            const picturesArr = await fetch(`http://localhost:3010/api/product/${productId}/pictures`)
            .then( response => {
                if (!response.ok) throw new Error('Error server 500');
                return response.json();
            })

            if (picturesArr[0]) setPictureUrl( 'http://localhost:3010/api/picture/'+ picturesArr[0].id )
        };

        getPicture(props.product.id);
    },[])

    return(
        <li className="row p-2 mt-2 bg-light ">
            <Link to={`/product/${props.product.id}/view`} className="text-decoration-none text-body">
                <div className="row justify-content-between ">
                    <div className="col-8 ">
                        <img src={pictureUrl} alt="" className="" style={{ maxWidth: '150px', maxHeight: '150px' }} />
                    </div>
                    <div className="col-4" >
                        <h2>{props.product.name}</h2>
                        <h4>{props.product.price} zł</h4>
                    </div>
                    <div>
                        <button className="btn btn-primary disabled" >Add to card</button>
                    </div>
                </div>
            </Link>
        </li>
    )
} 