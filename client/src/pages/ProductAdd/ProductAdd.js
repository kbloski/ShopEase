import { useEffect, useState } from "react";
import {  handleChange, handleSubmit  } from "./helpers/handleActions.js";
import { fetchCategories } from "./helpers/useEffectHelper.js";

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

   
    const onChange = (event) => handleChange(event, setName, setDescription, setPrice, setAvailableStock, setCategoryId, setPictures);


    const onSubmit = (event) => handleSubmit( event, name, description, price, available_stock, category_id, pictures);




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
                        onChange={ onChange }
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
                        onChange={ onChange }
                    />
                </div>
                <div>
                    <label htmlFor="descriptionControl" className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        id="descriptionControl"
                        name="description"
                        onChange={ onChange }
                    />
                </div>
                <div>
                    <label htmlFor="priceControl" className="form-label">Price</label>
                    <input
                        type="number"
                        className="form-control"
                        id="priceControl"
                        name='price'
                        onChange={ onChange }
                    />
                </div>
                <div>
                    <label htmlFor="stockControl" className="form-label">Available Stock</label>
                    <input
                        type="number"
                        className="form-control"
                        id="stockControl"
                        name='avaible_stock'
                        onChange={ onChange }
                    />
                </div>
                <div>
                    <label htmlFor="categoryControl" className="form-label">Category</label>
                    <select
                        name="category"
                        id="categoryControl"
                        className="form-control"
                        onChange={ onChange }
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
