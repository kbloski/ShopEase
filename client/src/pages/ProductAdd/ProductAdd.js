import { useEffect, useState } from "react";

export default function ProductAdd(props) {
    const [pictures, setPictures] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [available_stock, setAvailableStock] = useState(0);
    const [categoryId, setCategoryId] = useState('');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
                await fetch(
                    "http://localhost:3010/api/categories/all",
                    { method: 'GET' }
                )
                .then( response => {
                        if (!response.ok) throw new Error('Error fetch categories');
                        return response.json();
                    }
                )
                .then( data => {
                    setCategories( data );
                })
                .catch(err => console.error('Error fetch categories' , err));
        };

        fetchCategories();
    }, []);

    const handleChange = (event) => {
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

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('available_stock', available_stock);
        formData.append('categoryId', categoryId);

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





    return (
        <div>
            <form className="m-3 p-2" onSubmit={handleSubmit}>
                <div className="productPictures">
                    <label className="form-label">Add photos</label>
                    <input
                        type="file"
                        className="form-control product-image"
                        name="photo"
                        accept="image/*"
                        onChange={handleChange}
                        multiple
                    />
                </div>

                <div>
                    <label htmlFor="nameControl" className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nameControl"
                        name="name"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="descriptionControl" className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        id="descriptionControl"
                        name="description"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="priceControl" className="form-label">Price</label>
                    <input
                        type="number"
                        className="form-control"
                        id="priceControl"
                        name='price'
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="stockControl" className="form-label">Available Stock</label>
                    <input
                        type="number"
                        className="form-control"
                        id="stockControl"
                        name='avaible_stock'
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="categoryControl" className="form-label">Category</label>
                    <select
                        name="category"
                        id="categoryControl"
                        className="form-control"
                        onChange={handleChange}
                    >
                        <option value="">-</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Add</button>
            </form>
        </div>
    )
}
