import express from 'express';
import { reviewController, userController } from '../controllers/controllers.js';

const router = express.Router();

router.get('/add-to-product/:productId', async (req, res) =>{
    const {productId} = req.params;
    if (!productId) throw new Error('Error api - not add product review');
    
    const userDb = await productId.getById(productId);
    if (!userDb) res.json( {msg: 'Nie jesteś zalogowany, nie utworzono recenzji' , created: false} )

        const reviewDb = await reviewController.createReview(req.body);
});

export default router;