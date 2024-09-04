import { Address } from "../models/schemas.js";
import { userController } from "./controllers.js";

export class AddressController {
    async createAddress(addressData){
        return await Address.create(addressData);
    }
    
    async getById(id){
        return await Address.findByPk(id);
    }

    async updateById(id, addressData){
        await Address.update(
            addressData,
            {
                where: { id: id}
            }
        )
    }

    async deleteById(id){
        return await Address.destroy( {where: {id: id}})
    };
};