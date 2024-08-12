import { UserController } from "./UserController.js";
import { AddressController } from "./AddressController.js";

const userController = new UserController();
const addressController = new AddressController();

export { 
    userController,
    addressController
}


