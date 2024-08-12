import { UserController } from "./UserController.js";
import { AddressController } from "./AddressController.js";
import { ProductController } from "./ProductController.js";

const userController = new UserController();
const addressController = new AddressController();
const productController = new ProductController();

export { 
    userController,
    addressController,
    productController
}


