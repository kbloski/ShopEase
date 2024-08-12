import { OrderItems } from "../models/OrderItemsModel.js";

export class OrderItemsController {
    async getAll(){
        return await OrderItems.findAll();
    };

    async getById(id){
        return await OrderItems.findByPk(id)
    }

    async getAllforOrder(orderDb){
        return await OrderItems.findAll({
            while: {
                order_id: orderDb.id
            }
        });
    };

    async updateQuantityById(id, quantity){
        await OrderItems.update(
            {
                quantity: quantity
            },
            {
                where: {
                    id: id
                }
            }
        )
    };

    async updateProductById(id, productDb){
        const orderItemDb = await this.getById(id);
        orderItemDb.product_price = productDb.price;
        orderItemDb.product_id	= productDb.id;

        await OrderItems.update(orderItemDb, { 
            where: { id: orderItemDb.id}
        });
    }

    async deleteByid(id){
        await OrderItems.destroy({ where: {id: id}});
    }
}