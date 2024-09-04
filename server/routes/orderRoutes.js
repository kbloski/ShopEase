import express from 'express';
import { orderController, orderItemsController, productController, userController } from '../controllers/controllers.js';
import { sequelize } from '../utility/db.js';
import { isIntegerString } from '../utility/validate.js';
import { sendError, sendSuccess } from '../utility/errorUtils.js';

const router = express.Router();

router.post('/confirm', async (req, res) => {
    
})

router.put('/items/:itemId', async(req, res) => {
    try {
        const { itemId } = req.params;
        if (!itemId) return sendError(req, res, 400, '400 Bad Request');
        
        if (!req.user) return sendError( req, res, 401, '401 Unauthorized');
        
        const orderItemDb = await orderItemsController.getById(itemId);
        if (!orderItemDb) return sendError( req, res, 404, '404 Not Found');
        
        const updatedData = req.body;
        await orderItemsController.updateById( itemId , updatedData );

        return sendSuccess( req, res, 200, {
            data: {
                updated: true
            }
        })
    } catch (err){
        console.error(err);
        return sendError( req, res, 500, '500 Internal Server Error');
    }
});

router.delete('/:id', async (req, res) => {
    const transaction = await sequelize.transaction();
    try {

        if (!req.user){
            await transaction.rollback();
            return sendError( req, res, 401, '401 Unauthorized');
        }

        const {id} = req.params;
        console.log( id )
        if (!id || !isIntegerString(id)){
            await transaction.rollback();
            return sendError(req, res, 400, 'Bad request: Invalid order id');
        }

        const orderDb = await orderController.getById(id);
        const orderItemDb = await orderItemsController.getOrderItemByOrderId(id);

        if ( orderDb ) await orderController.deleteById( id );
        if (orderItemDb)await orderItemsController.deleteByid( orderItemDb.id );
            
        sendSuccess( req, res, 200, {
            data: {
                deleted: true
            }
        });

    } catch (err) {
        await transaction.rollback();
        console.error( err );
        return sendError(req, res, 500, '500 Internal Server Error')
    }
});

router.get( '/user/cart', async (req, res) => {
    try {
        if (!req.user) return sendError(req, res, 401, 'Unauthorized');
    
        // console.log( req.user.id )
        const ordersDb = await orderController.getOrdersInCartByUserId( req.user.id);
    
        const updateOrdersItem = await Promise.all( 
            ordersDb.map( async (value) => {
                const orderItem = await orderItemsController.getOrderItemByOrderId( value.id );
                return {...value.dataValues, orderItem:  orderItem.dataValues }
            })
        );
    
        const updateProducts = await Promise.all(
            updateOrdersItem.map( async (order) =>{
                const productDb = await productController.getById( order.orderItem.product_id);
                return {...order, product: productDb.dataValues};
            })
        )
    
        sendSuccess( req, res, 200, { 
            msg: '',
            data: { 
                orders: updateProducts
            }
        });
    } catch (err) {
        return sendError( req, res, 500, '500 Internal Server Error');
    }
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