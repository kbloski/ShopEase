export const handleChange = (
    event,
    setName,
    setDescription, 
    setPrice, 
    setAvailableStock, 
    setCategoryId, 
    setPictures
    ) => {
        const { name, value, files } = event.target;
        if (event.target.type === "file") {
            setPictures(prevPictures => [...prevPictures, ...Array.from(files)]);
        } else {
            switch (name) {
                case 'name':
                    setName(value);
                    break;
                case 'description':
                    setDescription(value);
                    break;
                case 'price':
                    setPrice(Number(value));
                    break;
                case 'avaible_stock':
                    setAvailableStock(Number(value));
                    break;
                case 'category':
                    setCategoryId(value);
                    break;
                default:
                    break;
        }
    }
}




export const handleSubmit = (event, name, description, price, available_stock, categoryId, pictures) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('available_stock', available_stock);
    formData.append('category_id', categoryId);

    if (pictures.length > 0) pictures.forEach( file => formData.append('images', file) );

    fetch(
        'http://localhost:3010/api/products/add', 
        {
            method: 'POST',
            body: formData
        }
    )
    .then(response => {
        if (!response.ok) throw new Error('Error adding product');
        return response.json();
    })
    .catch(err => console.error(err));
}