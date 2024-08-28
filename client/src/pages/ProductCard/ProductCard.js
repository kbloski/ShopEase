import { useEffect, useState} from 'react';
import { useParams } from "react-router-dom"
import { webTokenController } from '../../middlewares/WebTokenController.js';
import { basicUrl } from '../../config/store.config.js';
import { Link } from 'react-router-dom';
import { getProduct, getPictures, getReviews } from './helpers/useEffectHelper.js';
import { addToCard } from './helpers/addToCard.js';
import { handleChange } from '../ReviewAdd/helpers/handleActions.js';

export default function ProductCard(props){
    const { id } = useParams();
    const [ product, setProduct] = useState({});
    const [ picturesArr, setPicturesArr ] = useState([]);
    const [ reviewsArr, setReviewsArr] = useState([]);
    const [ quantity, setQuantity] = useState(1);

    useEffect( ()=>{
        getProduct(id, setProduct);
        getPictures(id, setPicturesArr);
        getReviews(id, setReviewsArr);
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
                            <form onSubmit={ addToCard }>
                                <div>
                                    <input type='number' hidden name='productId' defaultValue={product.id || ''} />
                                    <input type='number' name='quantity' min='1' max={ product.available_stock } value={quantity} onChange={ event => handleChange(event, setQuantity)}/>
                                </div>
                                <button className="btn btn-primary" type='submit' disabled={ product.available_stock ? false : true } >
                                    Add to card
                                </button>
                            </form>
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
                    { webTokenController.getToken() ? ( 
                        <div>
                            <Link to={ basicUrl + '/product/' + id + '/review/add'}>
                                <button className='btn btn-success'>Add review</button>
                            </Link>
                        </div>
                    ) : null}
                    
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