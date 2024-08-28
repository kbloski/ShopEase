import express from 'express';
import { orderController, orderItemsController, productController, userController } from '../controllers/controllers.js';
import { sequelize } from '../utility/db.js';

const router = express.Router();

router.post('/item/add', async (req, res) => {
    const transaction = await sequelize.transaction()

    try{
        if (!req.user) res.status(401).json('401 Unauthorized');

        const quantity = req.body.quantity
        if (!req.body.productId || !quantity) res.status(400).send('Bad request');

        const productDb = await productController.getById(req.body.productId);
        const userDb = await userController.getById( req.user.id );


        // Spradza czy istnieje order w koszyku
        let orderItemExist = false;
        const ordersInCart = await orderController.getOrdersInCartByUserId( userDb.id );
        for ( const order of ordersInCart){
            const orderItemData = await orderItemsController.getOrderItemByOrderId( order.id );
            if ( orderItemData.productId == productDb.id){
                orderItemExist = orderItemData;
                break;  
            }
        };

        if ( orderItemExist ){
            await orderItemsController.updateById( orderItemExist.id , {
                quantity: quantity,
                product_price: productDb.price
            });
        } else {
            const orderDb = await orderController.createOrder( { status: 'in_cart'}, userDb);
            const orderItemDb = await orderItemsController.createOrderItem( {
                quantity: quantity,
                product_price: productDb.price
            }, orderDb, productDb);
        }

        await transaction.commit()
        res.status(200).json( { created: true,  msg: 'Uworzono zamówienie'});
    } catch (err){

        console.error(err);
        await transaction.rollback();
        res.status(500).json('500 Interval server error');
    }
})

export default router;