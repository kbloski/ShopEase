import { useState } from "react";

export default function ProductAdd(props) {
    const [pictures, setPictures] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [avaible_stock, setAvaibleStock] = useState(0);
    const [categoryId, setCategoryId] = useState('');

    const handleChange = (event) => {
        const { name, value, files } = event.target;
        if (event.target.type === "file") {  
                setPictures([files, ...pictures])
           
            
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
                    setAvaibleStock(Number(value));
                    break;
                case 'category':
                    setCategoryId(value);
                    break;
                default:
                    break;
            }
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        
        formData.append('name', name);
        formData.append( 'description', description)
        formData.append( 'price', price)
        formData.append( 'avaible_stock', avaible_stock)
        formData.append( 'categoryId', categoryId)

        if (pictures) {

            pictures.forEach(file => {
                formData.append('images', file[0]);
            });
        }
        

        fetch('http://localhost:3010/api/product/add', {
            method: 'POST',
            body: formData
        })
        .then( response => {
            if (!response.ok){
                throw new Error('error - http://localhost:3010/api/product/add')
            }
            return response.json();
        })
        .then( response => {
            console.log( response )
        })
        .catch(err => console.error(err))
        
    }



    return (
        <div>
            <form className="m-3 p-2" onSubmit={handleSubmit}>
                <div className="productPictures">
                    <label className="form-label">Add photos</label>
                    <input
                            type="file"
                            className="form-control product-image"
                            name={`photo`}
                            accept="image/*"
                            onChange={handleChange}
                    />
                    <input
                            type="file"
                            className="form-control product-image"
                            name={`photo`}
                            accept="image/*"
                            onChange={handleChange}
                    />
                    
                </div>

                <div>
                    <label htmlFor="nameControl" className="form-label">Name</label>
                    <input type="text" className="form-control" id="nameControl" name="name" onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="descriptionControl" className="form-label">Description</label>
                    <input type="textarea" className="form-control" id="descriptionControl" name="description" onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="priceControl" className="form-label">Price</label>
                    <input type="number" className="form-control" id="priceControl" name='price' onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="stockControl" className="form-label">Avaible Stock</label>
                    <input type="number" className="form-control" id="stockControl" name='avaible_stock' onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="categoryControl" className="form-label">Category</label>
                    <select name="category" id="categoryControl" className="form-control" onChange={handleChange}>
                        <option>-</option>
                        <option value="1">Category 1</option>
                        <option value="2">Category 2</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Add</button>
            </form>
        </div>
    )
}
