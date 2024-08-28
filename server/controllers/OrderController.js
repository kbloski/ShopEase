import { where } from "sequelize";
import { Order } from "../models/OrderModel.js";
import { User } from "../models/UserModel.js";

export class OrderController{
    async getAll(){
        return await Order.findAll({});
    };

    async getById(id){
        return await Order.findByPk(id);
    };

    async getOrdersByUserId(userId){
        return await Order.findAll( { where: { user_id: userId }});
    }

    async getOrdersInCartByUserId(userId){
        return await Order.findAll( { where: 
            { 
                user_id: userId, 
                status: 'in_cart'
            }});
    }

    async createOrder(orderData, userDb){
        const orderDb = await Order.create();

        if (userDb) await orderDb.setUser(userDb);
        return orderDb;
    }

    async setUser(orderDb, userDb){
        return await Order.update( { user_id: userDb.id}, { where: { id: orderDb.id}});
    };

    async updateStatusById(status, id){
        await Order.update(
            {status: status}, 
            {where: {id: id}}
        )}

    async deleteById(id){
        await Order.destroy({where: {id: id}})
    };
}