import express from 'express';
import { productController, reviewController, userController } from '../controllers/controllers.js';
import { webTokenManager } from '../utility/tokenManager.js';
const router = express.Router();

router.post('/add-to-product/:productId', async (req, res) =>{
    try {
        
        console.log( req.user , '--------------------------')
        
        const {productId} = req.params;
        if (!productId) throw new Error('Error api - not add product review');
        

        const userDb = await userController.getById( req.user );

        const productDb = await productController.getById( productId);
        const userReviewsDb = await reviewController.getReviewsByUserId( userDb.id );

        let reviewExists = null;
        userReviewsDb.forEach( (value) => {
            if (value.dataValues.productId == productId){
                reviewExists = value.dataValues;
            }
        });

        console.log( reviewExists )

        if (reviewExists){
            await reviewController.updateById( reviewExists.id, req.body);
            res.status( 200 ).json( { msg: 'Review updated' ,created: true})
        } else {
            await reviewController.createReview( req.body, userDb, productDb);
            res.status( 200 ).json( { msg: 'Review created' ,created: true})
        }

    } catch (err){
        console.error(err)
    }
});

export default router;