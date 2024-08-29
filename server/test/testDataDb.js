import { 
userController,
addressController ,
productController ,
categoryController ,
orderController ,
orderItemsController,
paymentsController ,
reviewController ,

} from "../controllers/controllers.js";
import { OrderItemsController } from "../controllers/OrderItemsController.js";
import { OrderItems } from "../models/OrderItemsModel.js";
import { Reviews } from "../models/ReviewsModel.js";


const admindb = await userController.createUser({
    email: 'admin@example.com',
    password: 'test',
    role: 'admin',
    name: 'admin',
    surname: 'admin'
});

// const client1 = await userController.createUser({
//     email: 'client1@example.com',
//         password: 'test',
//         name: 'client1',
//         surname: 'client1',
//         phone: 111111111,
//         age: 18
// })

// const client2 = await userController.createUser({
//     email: 'client1@example.com',
//         password: 'test',
//         name: 'client1',
//         surname: 'client1',
//         phone: 111111111,
//         age: 18
// })

// // await userController.updateById(client1.id, {
// //     email: 'updated@example.com',
// //     password: 'test',
// //     role: 'shop_manager',
// //     name: 'updated',
// //     surname: 'updated',
// //     age: 33,
// //     phone: 999999999
// // });

// const address1 = await  addressController.createAddress({
//         street: 'Jana Pawła 2',
//         house_number: '194A', 
//         city: 'Jodłowa',
//         state: 'Podkarpackie',
//         postal_code: 39225,
//         country: 'Polska'
// });

// await userController.updateAddress(client1, address1); 


// const category1 = await categoryController.createCategory({
//     name: 'Kategoria 1',
//     description: 'Opis kategori 1'
// })


// const product1 = await productController.createProduct({
//     name: 'Filiżanka',
//     price: '13.99',
//     description: 'Opis szklanki za marne grosze',
//     available_stock: 33,
// }, category1);
// await productController.updateById(product1.id, {
//     name: 'Szklanka'
// })
 

// const product2 = await productController.createProduct({
//     name: 'Filiżanka',
//     price: '1.99',
//     description: 'Opis filiżanki za marne grosze',
//     available_stock: 33,
// });
// await productController.updateById(product1.id, {
//     name: 'Szklanka'
// });
// await productController.setCategory(product2, category1)
 


// const order1 = await orderController.createOrder({
// }, client2); 
// await orderController.setUser(order1, client2)


// const orderItem0 = await orderItemsController.createOrderItem({ 
//     quantity: 3,
// }, order1,product1);
// const orderItem1 = await orderItemsController.createOrderItem({ 
//     quantity: 3,
// }, order1,product1);
// await orderItemsController.updateProduct(order1, product2)
// await orderItemsController.updateQuantity(order1, 44);

// const payment = await paymentsController.createPayment({
//     method: 'blick',
//     amount: 333.12
// }, order1)

// const review1 = await Reviews.create({
//     rating: 4.5,
//     description: 'Super produkt'
// }) 

// const review1 = await Reviews.create({
//     rating: 3.0,
// });

// console.log( review1.id )

// await reviewController.updateById( review1.id, { userId: 2 } )
// await review1.setUser(client1);
// review1.setProduct(product1)