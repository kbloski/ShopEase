// src/pages/Login.jsx
import { useState } from "react";
import handleInputChange from "../../utils/formHandlers.js";
import { loginSubmit } from "./helpers/loginSubmit.js";
import { useNavigate } from 'react-router-dom';

export default function Login(props) {
  const navigate = useNavigate(); 

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = event => loginSubmit(event, { email: email, password: password}, navigate )

  return (
    <div>
      <h1>Login page</h1>
      <form className="p-2" onSubmit={ onSubmit }>
        <div>
          <label htmlFor="emailControl" className="form-label">Email</label>
          <input
            type="email"
            name="email"
            id="emailControl"
            className="form-control"
            onChange={ event => handleInputChange(event, setEmail) }
            required
          />
        </div>
        <div>
          <label htmlFor="passwordControl" className="form-label">Password</label>
          <input
            type="password"
            name="password"
            id="passwordControl"
            className="form-control"
            onChange={ event => handleInputChange(event, setPassword) }
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}
