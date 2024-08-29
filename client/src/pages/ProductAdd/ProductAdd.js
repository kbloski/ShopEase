import { useEffect, useState } from "react";
import { fetchCategories } from "./helpers/useEffectHelper.js";
import handleInputChange from "../../utils/formHandlers.js";
import { handlePicture } from "./helpers/handlePicture.js";
import { addProduct } from "./helpers/addProduct.js";


export default function ProductAdd(props) {
    const [pictures, setPictures] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [available_stock, setAvailableStock] = useState(0);
    const [category_id, setCategoryId] = useState('');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories(setCategories);
    }, []);

    const onSubmit = (event) => addProduct( event, 
        {
            name, description, 
            price, available_stock, 
            category_id, pictures
        }
    );

    return (
        <div>
            <form className="m-3 p-2" onSubmit={ onSubmit }>
                <div className="productPictures">
                    <label className="form-label">Add photos</label>
                    <input
                        type="file"
                        className="form-control product-image"
                        name="photo"
                        accept="image/*"
                        onChange={ event => handlePicture(event, setPictures) }
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
                        onChange={ event => handleInputChange(event, setName) }
                    />
                </div>
                <div>
                    <label htmlFor="descriptionControl" className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        id="descriptionControl"
                        name="description"
                        onChange={ event => handleInputChange(event, setDescription) }
                    />
                </div>
                <div>
                    <label htmlFor="priceControl" className="form-label">Price</label>
                    <input
                        type="number"
                        className="form-control"
                        id="priceControl"
                        name='price'
                        onChange={ event => handleInputChange(event, setPrice) }
                    />
                </div>
                <div>
                    <label htmlFor="stockControl" className="form-label">Available Stock</label>
                    <input
                        type="number"
                        className="form-control"
                        id="stockControl"
                        name='avaible_stock'
                        onChange={ event => handleInputChange(event, setAvailableStock) }
                    />
                </div>
                <div>
                    <label htmlFor="categoryControl" className="form-label">Category</label>
                    <select
                        name="category_id"
                        id="categoryControl"
                        className="form-control"
                        onChange={ event => handleInputChange(event, setCategoryId) }
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
