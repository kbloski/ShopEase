import express from 'express';
import { orderController, orderItemsController, productController, userController } from '../controllers/controllers.js';
import { sequelize } from '../utility/db.js';
import { isIntegerString } from '../utility/validate.js';
import { sendError, sendSuccess } from '../utility/errorUtils.js';

const router = express.Router();

router.get( '/user/cart', async (req, res) => {
    if (!req.user) return sendError(req, res, 401, 'Unauthorized');

    // console.log( req.user.id )
    const ordersDb = await orderController.getOrdersInCartByUserId( req.user.id);

    const updatedOrders = await Promise.all( 
        ordersDb.map( async (value) => {
            const orderItem = await orderItemsController.getOrderItemByOrderId( value.id );
            return {...value, orderItem:  orderItem.dataValues }
        })
    );

    const transformedOrders = updatedOrders.map(value => {
        return { ...value.dataValues };
    });
    

    sendSuccess( req, res, 200, { 
        msg: '',
        data: { 
            orders: transformedOrders
        }
    });
});

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