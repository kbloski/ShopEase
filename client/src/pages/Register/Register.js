import { Component } from "react";

export default class Register extends Component{
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: '',
            name: '',
            surname: '',
            age: '',
            phone: '',
        }
    };

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState( state => {
            state[name] = value
        })
    }

    handleSubmit = async (event) => {
        event.preventDefault()

        const formData = this.state;
        
        if (!formData.email) return false;
        if (!formData.password) return false;
        if (!formData.name) return false;
        if (!formData.surname) return false;


        await fetch(
            'http://localhost:3010/api/register', 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',  
                },
                body: JSON.stringify(formData),
            }
        )
        .then( response => {
            if (!response.ok) return console.error('Can\'t register user');
            return response.json();
        }).then( data => {
            console.log(data);        
        })
    }

    render(){
        return (
            <div>
                <form className='p-2' onSubmit={this.handleSubmit}>
                    <div className="p-2">
                        <label htmlFor="emailControl" className="form-label">Email</label>
                        <input type="email" name="email" id="emailControl" className="form-control" onChange={this.handleChange} required/>
                    </div>
                    <div className="p-2">
                        <label htmlFor="passwordControl" className="form-label">Password</label>
                        <input type="password" name="password" id="passwordControl" className="form-control" onChange={this.handleChange} required />
                    </div>
                    <div className='p-2'>
                        <label htmlFor="nameControl" className="form-label">Name</label>
                        <input type="text" name="name" id="nameControl" className="form-control" onChange={this.handleChange} required/>
                    </div>
                    <div className='p-2'>
                        <label htmlFor="surnameControl" className="form-label">Surname</label>
                        <input type="text" name="surname" id="surnameControl" className="form-control" onChange={this.handleChange} required/>
                    </div>
                    <div className="p-2">
                        <label htmlFor="ageControl" className="form-label">Age</label>
                        <input type="number" name="age" id="ageControl" min="0" className="form-control" onChange={this.handleChange}/>
                    </div>
                    <div className="p-2">
                        <label htmlFor="phoneControl" className="form-label">Phone</label>
                        <input type="number" name="phone" id="phoneControl" className="form-control" onChange={this.handleChange}/>
                    </div>
                    <button type='submit' className='btn btn-primary' onClick={this.handleSubmit} >Register</button>
                </form>
            </div>
        );
    }
}