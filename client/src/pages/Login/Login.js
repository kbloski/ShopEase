// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { handleChange, handleSubmit } from "./helpers/handleActions.js";

export default function Login(props) {
  const navigate = useNavigate(); // get navigate here
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChange = event => handleChange(event, setEmail, setPassword);

  const onSubmit = event => handleSubmit(event, email, password, navigate); // pass navigate as argument

  return (
    <div>
      <h1>Login page</h1>
      <form className="p-2" onSubmit={onSubmit}>
        <div>
          <label htmlFor="emailControl" className="form-label">Email</label>
          <input
            type="email"
            name="email"
            id="emailControl"
            className="form-control"
            onChange={onChange}
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
            onChange={onChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}
