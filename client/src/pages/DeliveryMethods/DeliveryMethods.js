import { useEffect, useState } from "react";
import { addDeliveryMethod } from "./helpers/addDeliveryMethod.js";
import { getDeliveryMethods } from "./helpers/getDeliveryMethods.js";

export function DeliveryMethods(props){
    const [ delivery, setDelivery ] = useState({});
    const [ deliveryMethods, setDeliveryMethods] = useState([]);
    

    useEffect( ()=>{
        const getMethods = async () => {
            const result = await getDeliveryMethods();
            setDeliveryMethods( result );
        }

        document.getElementById('add-submit').addEventListener( 'click', ()=>{
            getMethods();
        } )

        getMethods();
    }, [ ]);

    const onChangeDelivery = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setDelivery( prev => {
            prev[name] = value;
            return prev;
        })
    }

    const onSubmitAddDeliveryMethod = async (event) => {
        event.preventDefault();
        addDeliveryMethod( delivery );
    }


    return (
        <div className="container p-2">
            <form onSubmit={onSubmitAddDeliveryMethod}>
                <label htmlFor="nameControl" className="form-label">Name</label>
                <input 
                    type="text" 
                    name="name" 
                    id="nameControl" 
                    className="form-control"
                    onChange={ onChangeDelivery }
                ></input>
                <label htmlFor="priceControl" className="form-label">Price</label>
                <input 
                    type="text" 
                    name="price" 
                    id="priceControl" 
                    className="form-control"
                    onChange={ onChangeDelivery }
                ></input>
                <label htmlFor="descriptionControl" className="form-label">Description</label>
                <input 
                    type="text" 
                    name="description" 
                    id="descriptionControl" 
                    className="form-control"
                    onChange={ onChangeDelivery }
                ></input>
                <button type="submit" className="btn btn-success" id="add-submit">Add</button>
            </form>
            <hr></hr>
            <div>
              <h3>Methods List</h3>  
              <ul>
                {
                    deliveryMethods.map( (d, index) => <li key={d.id}>
                        <div className="d-flex justify-content-between" >
                            <div >{index}</div>
                            <div>{d.name}</div>
                            <div>{d.price}</div>
                        </div>
                    </li>)
                }
              </ul>
            </div>
            
        </div>
    )
}