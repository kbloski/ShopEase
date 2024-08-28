// src/pages/helpers/handleActions.js
import { TOKEN_KEY, USERAUTH_KEY } from "../../../config/constans.js";
import { decodedToken } from "../../../utils/tokenDecoded.js";
import { basicUrl } from '../../../config/store.config.js';
import { webTokenController } from "../../../middlewares/WebTokenController.js";



export const handleChange = (event, setEmail, setPassword) => {
  const { name, value } = event.target;

  if (name === 'email') setEmail(value);
  if (name === 'password') setPassword(value);
};

export const handleSubmit = async (event, email, password, navigate) => {
  event.preventDefault();

  const formData = { email, password };

  try {
    const response = await fetch('http://localhost:3010/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      console.error("Can't login");
      return;
    }

    const data = await response.json();

    if (!data.token) {
      webTokenController.clearToken();
    } else {
      webTokenController.setToken( data.token)
      navigate(basicUrl);
    }

    console.log(data);
  } catch (err) {
    console.error(err);
  }
};
