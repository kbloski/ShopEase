
export const submitRegister = async (event, formData) => {
    event.preventDefault();

    const { email, password, name, surname } = formData;

    if (!email || !password || !name || !surname) return false;

    try {
        await fetch('http://localhost:3010/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then( response => {
            if (!response.ok) throw new Error("Can't register user");
            return response.json();
        })
        .then( data => console.log( data ) )
        .catch( err => console.error(err ));
        


    } catch (err) {
        console.error('Error:', err);
    }
};
