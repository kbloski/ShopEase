import { OrderItems } from "../models/OrderItemsModel.js";

export class OrderItemsController {
    async getAll(){
        return await OrderItems.findAll();
    };

    async getById(id){
        return await OrderItems.findByPk(id)
    }

    async getOrderItemByOrderId( orderId ){
        return await OrderItems.findOne( {where: {orderId: orderId}})
    }

    async createOrderItem(orderItemData, orderDb, productDb){
        const orderItemDb = await OrderItems.create(orderItemData);

        if (orderDb) await orderItemDb.setOrder(orderDb);

        if (productDb) {
            await orderItemDb.setProduct(productDb);
            await orderItemDb.update({ product_price: productDb.price})
        }

        return orderItemDb;
    }

    async updateById( id , orderItemData ){
        return await OrderItems.update( orderItemData , { where: {id: id}})
    }

    async updateQuantity(orderItemDb, quantity){
        await OrderItems.update(
            {
                quantity: quantity
            },
            {
                where: {
                    id: orderItemDb.id
                }
            }
        )
    };

    async updateProduct(orderItemDb, productDb){
        orderItemDb.product_price = productDb.price;
        orderItemDb.productId	= productDb.id;

        await OrderItems.update(orderItemDb, { 
            where: { id: orderItemDb.id}
        });
    }

    async deleteByid(id){
        await OrderItems.destroy({ where: {id: id}});
    }
}