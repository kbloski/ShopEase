export async function getProducts(setProductsArr){

    const products = await fetch("http://localhost:3010/api/products/get/all", {method: 'GET'})
    .then( response => { 
        if (!response.ok) throw new Error('Error server - http://localhost:3010/api/product/get/all');

        return response.json();
    })
    
    setProductsArr( products );
}