import { basicUrl } from "../../../config/store.config.js";
import { webTokenManager } from "../../../utils/WebTokenManager.js";


export const loginSubmit = async (
  event, 
  form = {
    email: 'email@example.com',
    password: '*****'
  },
  navigate
) => {
  event.preventDefault();

  const formData = { 
    email: form.email, 
    password: form.password 
  };

  try {
    const response = await fetch(
      'http://localhost:3010/api/login', 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then( async response =>{
      if (!response.ok) {
        const errData =  await response.json() 
        throw new Error(errData.msg);
      }
      return response.json();
    })
    .then(
      data => {
        if (data.token){
          webTokenManager.setToken( data.token );
          navigate( basicUrl + '/');
        }
        console.log( data.msg )
      }
    )

  } catch (err) {
    console.error(err);
  }
};
