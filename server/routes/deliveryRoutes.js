import express from 'express';
import { sendError, sendSuccess } from '../utility/errorUtils.js';
import { deliveryMethodController } from '../controllers/controllers.js';

const router = express.Router();

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