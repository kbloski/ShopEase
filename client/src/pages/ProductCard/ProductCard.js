import { useEffect, useState} from 'react';
import { useParams } from "react-router-dom"

export default function ProductCard(props){
    const { id } = useParams();
    const [ product, setProduct] = useState({});
    const [ picturesArr, setPicturesArr ] = useState([]);
    const [ reviewsArr, setReviewsArr] = useState([]);

    useEffect( ()=>{
        const getProduct = async (id) => {
            const product = await fetch(
                `http://localhost:3010/api/products/${id}`, 
                {method: 'GEt'}
            )
            .then( response => {
                if (!response.ok) throw new Error('Fetch error - https://localhost:3010/api/products/id');
                return response.json()
            })
            .catch( err => console.error(err));
            
            setProduct(product);
        }
        getProduct(id);

        const getPictures = async(id) => {
            const pictures = await fetch(
                `http://localhost:3010/api/products/${id}/pictures`, 
                {method: 'GET'}
            )
            .then( response => {
                if (!response.ok) throw new Error('Error server - api:http://localhost:3010/api/products/id/pictures ');
                return response.json();
            })
            .catch( err => console.error(err))

            setPicturesArr(pictures);
        };
        getPictures(id);

        const getReviews = async(id) => {
            const reviews = await fetch(
                `http://localhost:3010/api/products/${id}/reviews`, 
                {method: 'GET'}
            )
            .then( response => {
                if (!response.ok) throw new Error('Error server - api:http://localhost:3010/api/products/id/pictures ');
                return response.json()
            } )
            .catch(err => console.error(err));
            setReviewsArr(reviews);
        }
        getReviews(id);
    }, [ id ]);



    
    return(
        <div id='container p-2'>
            <div className='row gx-4'>
                <div className='col-8 bg-light' style={ { minHeight: '500px' } } >
                    { picturesArr.map( picture => {
                        return <img key={picture.id} src={`http://localhost:3010/api/pictures/${picture.id}`} alt='' className='img-fluid'/>
                    })}
                </div>  
                <div className='col-4 d-flex align-items-center justify-content-center'>
                    <div>
                        <div> <h2>{product.name}</h2> </div>
                        <div> <h4>Stock: {product.available_stock}</h4></div>
                        <div> <h3>Price: { product.price } zł</h3></div>
                        <div>
                            <button className="btn btn-primary">
                                Add to card
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <h2>Opis produktu</h2>
                    <p>
                        {product.description}
                    </p>
                </div>
            </div>
            <div className="row">
                <hr/>
                <div className="col-10 text-center">Reviews:</div>
                <div className='col-2'>
                    <button className='btn btn-success'>Add review</button>
                </div>
                <div className='col-12'>
                    { reviewsArr.map( review => {
                        return (
                            <div key={review.id} className='row'>
                                <div className='col-2'>Rating: {review.rating}</div>
                                <div className='col-2'>{review.user.email}</div>
                                <div className='col-8'>Description: { review.description }</div>
                            </div>
                        )
                    })}

                        
                </div>
            </div>
        </div>
    )
}