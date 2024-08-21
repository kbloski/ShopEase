import { sequelize } from "../utility/db.js";
import { User } from "./UserModel.js";
import { Address } from "./AddressModel.js";
import { Photo } from "./PhotoModel.js";
import { Product } from "./ProductModel.js";
import { Order } from "./OrderModel.js";
import { OrderItems } from "./OrderItemsModel.js";
import { Category } from "./CategoryModel.js";
import { Payments } from "./PaymentsModel.js";
import { Reviews } from "./ReviewsModel.js";
import { Delivery } from "./DeliveryModel.js";


// TODO - add relations model in this place

// Relation for Address and User
Address.hasOne(User, {
    foreignKey: 'addressId'
});
User.belongsTo(Address, {
    foreignKey: 'addressId'
});

// Relation for photo and product
Product.hasMany(Photo, {
    foreignKey: 'productId'
});
Photo.belongsTo(Product, {
    foreignKey: 'productId'
})

// Relation for products and categories
Category.hasMany(Product, {
    foreignKey: 'categoryId',
});
Product.belongsTo(Category, {
    foreignKey: 'categoryId'
})

// Relation for Orders and User
User.hasMany(Order, {
    foreignKey: 'userId'
})
Order.belongsTo(User, {
    foreignKey: 'userId'
});

// Relation for OrdersItem
Order.hasMany(OrderItems, {
    foreignKey: 'orderId'
});
OrderItems.belongsTo(Order, {
    foreignKey: 'orderId'
})

Product.hasMany(OrderItems, {
    foreignKey: 'productId'
})
OrderItems.belongsTo(Product, {
    foreignKey: 'productId'
})

// Relation for Payments
Payments.belongsTo(Order, { 
    foreignKey: 'orderId'
})
Order.hasOne(Payments, {
    foreignKey: 'orderId'
})

// Relation for Reviews
Reviews.belongsTo(User, {
    foreignKey: 'userId'
});
User.hasMany(Reviews, {
    foreignKey: 'userId'
})

Reviews.belongsTo(Product, {
    foreignKey: 'productId'
});
Product.hasMany(Reviews, {
    foreignKey: 'productId'
})

// Relations Delivery
Address.hasMany(Delivery, {
    foreignKey: 'addressId'
});
Delivery.belongsTo(Address, {
    foreignKey: 'addressId'
})

Delivery.hasOne(Order, {
    foreignKey: 'deliveryId'
});
Order.belongsTo(Delivery, {
    foreignKey: 'deliveryId'
})



await sequelize.sync();  

export {
    User,
    Address,
    Photo,
    Product,
    Order,
    OrderItems,
    Category,
    Payments,
    Reviews,
    Delivery
}
