import { Order } from "../models/OrderModel.js";

export class OrderController{
    async getAll(){
        return await Order.findAll({});
    };

    async getById(id){
        return await Order.findByPk(id);
    };

    


    async createOrder(orderData, userDb){
        const orderDb = await Order.create();

        if (userDb) await orderDb.setUser(userDb);

        return orderDb;
        
    }

    async setUser(orderDb, userDb){
        await orderDb.setUser(userDb);
    };

    async updateStatusById(status, id){
        await Order.update(
            {status: status}, 
            {
            where: {id: id}
        })
    }

    async deleteById(id){
        await Order.destroy({where: {id: id}})
    };
}