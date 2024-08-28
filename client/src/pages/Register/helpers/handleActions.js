export const handleChange = (event, context) => {
    const { name, value } = event.target;
    context.setState({ [name]: value });
};

export const handleSubmit = async (event, formData) => {
    event.preventDefault();

    const { email, password, name, surname } = formData;

    if (!email || !password || !name || !surname) return false;

    try {
        const response = await fetch('http://localhost:3010/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            console.error('Can\'t register user');
            return;
        }

        const data = await response.json();
        console.log(data);

    } catch (err) {
        console.error('Error:', err);
    }
};
