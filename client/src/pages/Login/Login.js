import { useState } from "react";
import { TOKEN_KEY, USERAUTH_KEY } from "../../config/constans.js";
import { useNavigate } from 'react-router-dom';
import { decodedToken } from "../../utils/tokenDecoded.js";
import storeConfig from '../../config/storeConfig.js'

export default function Login(props) {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    

    const handleChange = (event) => {
        const { name, value} = event.target;

        if (name === 'email') setEmail(value);
        if (name === 'password') setPassword(value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = {};

        formData.email = email;
        formData.password = password;

        fetch('http://localhost:3010/api/login', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then( response => {
            if (!response.ok) return console('Can\'t login');
            return response.json();
        })
        .then( data => {
            if (!data.getToken ){
                localStorage.setItem(TOKEN_KEY, ''); 

            } else {
                localStorage.setItem(TOKEN_KEY, data.token);
                localStorage.setItem(USERAUTH_KEY, decodedToken(data.token))
                navigate(storeConfig.basicUrl)
            }
            console.log( data )
        }).catch(err => {
            console.error(err)
        })
    }

    return (
        <div>
            <h1>Login page</h1>
            <form className="p-2" onSubmit= { handleSubmit }>
                <div>
                    <label htmlFor="emailControl" className="form-label">Email</label>
                    <input type="email" name="email" id="emailControl" className="form-control" onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="passwordControl" className="form-label">Password</label>
                    <input type="password" name="password" id="passwordControl" className="form-control"  onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
        </form>
        </div>
    )
}