import express from 'express';
import { sendError, sendSuccess } from '../utility/errorUtils.js';
import { deliveryMethodController } from '../controllers/controllers.js';

const router = express.Router();

router.post('/methods/add', async (req, res) => {
    try {
        if (!req.body) return sendError(req, res, 400, '400 Bad Request');

        console.log( req.body )
        const deliveryDb = await deliveryMethodController.createDeliveryMethod( req.body );

        if (deliveryDb) sendSuccess(req, res, 200, {});
    } catch (err){
        console.error(err)
        sendError(req, res, 500, '500 Internal Server Error');
    }
})

router.get('/methods/all', async (req, res) => {
    try {
        const methodsArr = await deliveryMethodController.getAll();
        
        sendSuccess( req, res, 200, {
            data: { deliveryMethods: methodsArr }
        })
    } catch (err){
        console.error( err );
        sendError(req, res, 500, '500 Internal Server Error')
    }
})


export default router;