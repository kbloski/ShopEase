import { useState } from "react"
import { submitAddAddress } from "./helpers/submitAddAddress";

export function AddressAdd(props){
    const [address, setAddress] = useState({});

    const onChangeAddress = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        console.log( address )
        setAddress( prev => {
            prev[name] = value;
            return prev;
        })
    };

    const onSubmit = (event) => {
        event.preventDefault();
        submitAddAddress( address );
    }

    return (
        <div className="container p-2">
            <h3>Add address</h3>
            <form onSubmit={ onSubmit }>
                <label htmlFor="streetControl" className="form-label">Street</label>
                <input
                    type="text"
                    name="street"
                    id="streetControl"
                    className="form-control"
                    onChange={onChangeAddress}
                    required
                />
                <label htmlFor="houseNumberControl" className="form-label">House Number</label>
                <input
                    type="text"
                    name="house_number"
                    id="houseNumberControl"
                    className="form-control"
                    onChange={onChangeAddress}
                />
                <label htmlFor="cityControl" className="form-label">City</label>
                <input
                    type="text"
                    name="city"
                    id="cityControl"
                    className="form-control"
                    onChange={onChangeAddress}
                    required
                />
                <label htmlFor="stateControl" className="form-label">State</label>
                <input
                    type="text"
                    name="state"
                    id="stateControl"
                    className="form-control"
                    onChange={onChangeAddress}
                />
                <label htmlFor="postalCodeControl" className="form-label">Postal Code</label>
                <input
                    type="number"
                    min='10000'
                    max='99999'
                    name="postal_code"
                    id="postalCodeControl"
                    className="form-control"
                    onChange={onChangeAddress}
                    required
                />
                <label htmlFor="countryControl" className="form-label">Country</label>
                <input
                    type="text"
                    name="country"
                    id="countryControl"
                    className="form-control"
                    onChange={onChangeAddress}
                />
                <button type="submit" className="btn btn-success">Add</button>
            </form>
        </div>
    )
}