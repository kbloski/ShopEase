export const getProduct = async (id, setProduct) => {
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

export const getPictures = async(id, setPicturesArr) => {
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

export const getReviews = async(id, setReviewsArr) => {
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
