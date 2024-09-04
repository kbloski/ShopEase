import { UserController } from "./UserController.js";
import { AddressController } from "./AddressController.js";
import { PictureController } from "./PicturesController.js";
import { ProductController } from "./ProductController.js";
import { CategoryController } from "./CategoryController.js";
import { OrderController } from "./OrderController.js";
import { OrderItemsController } from "./OrderItemsController.js";
import { PaymentsController } from "./PaymentsController.js";
import { ReviewController } from "./ReviewsController.js";
import { DeliveryController } from "./DeliveryController.js";
import { DeliveryMethodsController } from "./DeliveryMethods.js";

const userController = new UserController();
const addressController = new AddressController();
const pictureController = new PictureController();
const productController = new ProductController();
const categoryController = new CategoryController();
const orderController = new OrderController();
const orderItemsController = new OrderItemsController();
const paymentsController = new PaymentsController();
const reviewController = new ReviewController();
const deliveryController = new DeliveryController();
const deliveryMethodController = new DeliveryMethodsController();

try {
    const adminDb = await userController.getUserByEmail('admin@example.com');

    if (!adminDb){
        userController.createUser({
            id: 1,
            email: 'admin@example.com',
            password: 'test',
            role: 'admin',
            name: 'admin',
            surname: 'admin'
        });
    }
} catch (err){
    console.error(err)
}

export { 
    userController,
    addressController,
    pictureController,
    productController,
    categoryController,
    orderController,
    orderItemsController,
    paymentsController,
    reviewController,
    deliveryController,
    deliveryMethodController
}


