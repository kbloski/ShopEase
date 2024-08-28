export const fetchCategories = async (setCategories) => {
    await fetch(
        "http://localhost:3010/api/categories/all",
        { method: 'GET' }
    )
    .then( response => {
            if (!response.ok) throw new Error('Error fetch categories');
            return response.json();
        }
    )
    .then( data => {
        setCategories( data );
    })
    .catch(err => console.error('Error fetch categories' , err));
};