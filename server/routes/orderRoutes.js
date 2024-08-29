import express from 'express';
import { orderController, orderItemsController, productController, userController } from '../controllers/controllers.js';
import { sequelize } from '../utility/db.js';
import { isIntegerString } from '../utility/validate.js';
import { sendError } from '../utility/errorUtils.js';
import { upload } from '../utility/uploadFiles.js';

const router = express.Router();

router.post('/item/add', async (req, res) => {
    const transaction = await sequelize.transaction()
    try{
        if (!req.user){
            await transaction.rollback();
            return sendError(req, res, 401, '401 Unauthorized');  
        }
        if (!isIntegerString(req.body.productId)){
           await transaction.rollback();
           return sendError(req, res, 400, '400 Bad Request: Bad product Id'); 
        }   

        const quantity = req.body.quantity;
        if (!quantity) {
            await transaction.rollback();
            return sendError(req, res, 500, '500 internal server error');  
        }

        const productDb = await productController.getById(req.body.productId);
        const userDb = await userController.getById( req.user.id );

        // Spradza czy istnieje order w koszyku
        let orderItemExist = false;
        const ordersInCart = await orderController.getOrdersInCartByUserId( userDb.id );
        for ( const order of ordersInCart){
            const orderItemData = await orderItemsController.getOrderItemByOrderId( order.id );

            if ( orderItemData.product_id === productDb.id){
                orderItemExist = orderItemData;
                break;  
            }
        };
        
        if ( orderItemExist ){
            await orderItemsController.updateById( orderItemExist.id , {
                quantity: quantity,
                product_price: productDb.price
            });

            
            await transaction.commit()
            res.status(200).json( { created: false, updated: true,  msg: 'Uworzono zamówienie'});
        } else {
            const orderDb = await orderController.createOrder( { status: 'in_cart'}, userDb);
            const orderItemDb = await orderItemsController.createOrderItem( {
                quantity: quantity,
                product_price: productDb.price
            }, orderDb, productDb);
            
            await transaction.commit()
            res.status(200).json( { created: true, updated: false,  msg: 'Uworzono zamówienie'});
        }
    } catch (err){
        console.error(err);
        await transaction.rollback();
        sendError(req,res, 500, '500 Interval Server Error');
    }
})

export default router;