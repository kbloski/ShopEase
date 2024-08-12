import { sequelize } from "../utility/db.js";
import { User } from "./UserModel.js";
import { Address } from "./AddressModel.js";
import { Product } from "./ProductModel.js";
import { Order } from "./OrderModel.js";
import { OrderItems } from "./OrderItemsModel.js";
import { Category } from "./CategoryModel.js";
import { Payments } from "./PaymentsModel.js";
import { Reviews } from "./ReviewsModel.js";


// TODO - add relations model in this place

// Relation for Address and User
Address.hasOne(User, {
    foreignKey: 'address_id'
});
User.belongsTo(Address, {
    foreignKey: 'address_id'
});

// Relation for products and categories
Category.hasMany(Product, {
    foreignKey: 'category_id',
});
Product.belongsTo(Category, {
    foreignKey: 'category_id'
})

// Relation for Orders and User
User.hasMany(Order, {
    foreignKey: 'user_id'
})
Order.belongsTo(User, {
    foreignKey: 'user_id'
});

// Relation for OrdersItem
Order.hasMany(OrderItems, {
    foreignKey: 'order_id'
});
OrderItems.belongsTo(Order, {
    foreignKey: 'order_id'
})

Product.hasMany(OrderItems, {
    foreignKey: 'product_id'
})
OrderItems.belongsTo(Product, {
    foreignKey: 'product_id'
})

// Relation for Payments
Payments.belongsTo(Order, {
    foreignKey: 'order_id'
})
Order.hasOne(Payments, {
    foreignKey: 'order_id'
})

// Relation for Reviews
Reviews.belongsTo(User, {
    foreignKey: 'user_id'
});
User.hasMany(Reviews, {
    foreignKey: 'user_id'
})

Reviews.belongsTo(Product, {
    foreignKey: 'product_id'
});
Product.hasMany(Reviews, {
    foreignKey: 'product_id'
})

await sequelize.sync( {force: true});  

export {
    User,
    Address,
    Product,
    Order,
    OrderItems,
    Category,
    Payments,
    Reviews
}


// TEST
const admin = await User.create({
    email: 'admin@example.com',
    password: 'test',
    name: 'admin',
    surname: 'admin',
})

// test 
// const client1 = await User.create({
//     email: 'client1@example.com',
//     password: 'test',
//     name: 'client1',
//     surname: 'client1',
//     phone: 111111111,
//     age: 18
// });

// const address1 = await  Address.create({
//     street: 'Jana Pawła 2',
//     house_number: '194A',
//     city: 'Jodłowa',
//     state: 'Podkarpackie',
//     postal_code: 39225,
//     country: 'Polska'
// });

// client1.setAddress(address1)

// const product1 = await Product.create({
//     name: 'Filiżanka',
//     price: 13.99,
// })
// const product2 = await Product.create({
//     name: 'Kawa',
//     price: 1.99,
// })

// const category1 = await Category.create({
//     name: 'Kategoria 1'
// })
// product1.setCategory(category1);
// product2.setCategory(category1)


// const order1 = await Order.create({});
// order1.setUser(client1);


// const orderitem1 = await OrderItems.create({
//     quantity: 3,
//     product_price: 33
// });

// orderitem1.setOrder(order1);
// orderitem1.setProduct(product1);

// const payments = await Payments.create({
//     method: 'blik',
//     amount: 33.12,
// })
// payments.setOrder(order1)

// const review1 = await Reviews.create({
//     rating: 3.0,
// });

// review1.setUser(client1);
// review1.setProduct(product1)