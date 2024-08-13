import { Address } from "../models/schemas.js";

export class AddressController {
    async getById(id){
        return await Address.findByPk(id);
    }

    async createAddress(addressData){
        return await Address.create(addressData);
    }

    async updateById(id, addressData){
        await Address.update(
            addressData,
            {
                where: { id: id}
            }
        )
    }
};