import { sequelize } from "../utility/db.js";
import { User } from "./UserModel.js";
import { Address } from "./AddressModel.js";
import { Picture } from "./PictureModel.js";
import { Product } from "./ProductModel.js";
import { Order } from "./OrderModel.js";
import { OrderItems } from "./OrderItemsModel.js";
import { Category } from "./CategoryModel.js";
import { Payments } from "./PaymentsModel.js";
import { Reviews } from "./ReviewsModel.js";
import { Delivery } from "./DeliveryModel.js";
import { DeliveryMethods } from "./DeliveryMethods.js";


// TODO - add relations model in this place

// Relation for Address and User
Address.hasOne(User, {
    foreignKey: 'address_id'
});
User.belongsTo(Address, {
    foreignKey: 'address_id'
});

// Relation for Picture and product
Product.hasMany(Picture, {
    foreignKey: 'product_id'
});
Picture.belongsTo(Product, {
    foreignKey: 'product_id'
})

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

// Relations Delivery
Address.hasMany(Delivery, {
    foreignKey: 'address_id'
});
Delivery.belongsTo(Address, {
    foreignKey: 'address_id'
})

Delivery.hasOne(Order, {
    foreignKey: 'delivery_id'
});
Order.belongsTo(Delivery, {
    foreignKey: 'delivery_id'
})



await sequelize.sync();  

export {
    User,
    Address,
    Picture,
    Product,
    Order,
    OrderItems,
    Category,
    Payments,
    Reviews,
    Delivery,
    DeliveryMethods
}
