import { DeliveryMethods } from "../models/DeliveryMethods.js";


export class DeliveryMethodsController
{
    async createDeliveryMethod( deliveryMethodData ){
        return await DeliveryMethods.create( deliveryMethodData );
    }

    async getAll (){
        return await DeliveryMethods.findAll({});
    }  

    async getById (id){
        return await DeliveryMethods.findByPk(id);
    }    

    async updateById (id, deliveryData ){
        return await DeliveryMethods.update(deliveryData, { where: {id: id}});
    }    

    async deleteById (id){
        return await DeliveryMethods.destroy( {where: {id:id}});
    }

    
}