export const handleChange = (event, context) => {
    const { name, value } = event.target;
    context.setState({ [name]: value });
};
