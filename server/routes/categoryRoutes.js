import express from 'express';
import { categoryController } from '../controllers/controllers.js';
import { sendError } from '../utility/errorUtils.js';

const router = express.Router();

router.get('/all', async (req, res) => {
    try {
        const categoryArr = await categoryController.getAll();
        res.status(200).json(categoryArr);
    } catch( err){
        console.error( err );
        sendError(req, res, 500, '500 Interval Server Error');
    }
})

export default router;