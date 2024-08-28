import React, { Component } from "react";
import { handleChange, handleSubmit } from "./helpers/handleActions.js";

export default class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            name: '',
            surname: '',
            age: '',
            phone: '',
        };
    }

    render() {
        return (
            <div>
                <form className='p-2' onSubmit={event => handleSubmit(event, this.state)}>
                    <div className="p-2">
                        <label htmlFor="emailControl" className="form-label">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="emailControl"
                            className="form-control"
                            onChange={event => handleChange(event, this)}
                            required
                        />
                    </div>
                    <div className="p-2">
                        <label htmlFor="passwordControl" className="form-label">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="passwordControl"
                            className="form-control"
                            onChange={event => handleChange(event, this)}
                            required
                        />
                    </div>
                    <div className='p-2'>
                        <label htmlFor="nameControl" className="form-label">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="nameControl"
                            className="form-control"
                            onChange={event => handleChange(event, this)}
                            required
                        />
                    </div>
                    <div className='p-2'>
                        <label htmlFor="surnameControl" className="form-label">Surname</label>
                        <input
                            type="text"
                            name="surname"
                            id="surnameControl"
                            className="form-control"
                            onChange={event => handleChange(event, this)}
                            required
                        />
                    </div>
                    <div className="p-2">
                        <label htmlFor="ageControl" className="form-label">Age</label>
                        <input
                            type="number"
                            name="age"
                            id="ageControl"
                            min="0"
                            className="form-control"
                            onChange={event => handleChange(event, this)}
                        />
                    </div>
                    <div className="p-2">
                        <label htmlFor="phoneControl" className="form-label">Phone</label>
                        <input
                            type="number"
                            name="phone"
                            id="phoneControl"
                            className="form-control"
                            onChange={event => handleChange(event, this)}
                        />
                    </div>
                    <button type='submit' className='btn btn-primary'>Register</button>
                </form>
            </div>
        );
    }
}
