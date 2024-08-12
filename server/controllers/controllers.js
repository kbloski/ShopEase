import { UserController } from "./UserController.js";
import { AddressController } from "./AddressController.js";
import { ProductController } from "./ProductController.js";
import { CategoryController } from "./CategoryController.js";

const userController = new UserController();
const addressController = new AddressController();
const productController = new ProductController();
const categoryController = new CategoryController();

export { 
    userController,
    addressController,
    productController,
    categoryController
}


