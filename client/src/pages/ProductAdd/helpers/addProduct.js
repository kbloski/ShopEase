export const addProduct = (event, form ) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('description', form.description);
    formData.append('price', form.price);
    formData.append('available_stock', form.available_stock);
    
    if ( form.categoryId ){
        formData.append('category_id', form.categoryId);
    }


    if ( form.pictures.length > 0) form.pictures.forEach( file => formData.append('images', file) );

    fetch(
        'http://localhost:3010/api/products/add', 
        {
            method: 'POST',
            body: formData
        }
    )
    .then(async response => {
        if (!response.ok) {
            const errData = await response.json();
            throw new Error(`Error ${response.status}: ${errData.msg}`)
        };
        return response.json();
    })
    .catch(err => console.error(err));
}