import express from 'express';
import { productController, pictureController, reviewController, userController, categoryController } from '../controllers/controllers.js';
import { upload } from '../utility/uploadFiles.js';
import { isInRange, isIntegerString } from '../utility/validate.js';
import { sequelize } from '../utility/db.js';
import { deleteFile } from '../utility/filesOperations.js';
import { sendError } from '../utility/errorUtils.js';

const router = express.Router();

router.get('/:productId/reviews', async (req, res) => {
    try{
        const { productId } = req.params;
        if (!isIntegerString(productId) ) return sendError(req, res, 400, '400 Bad Request: Bad product id');

        const reviews = await reviewController.getAllByProductId(productId);

        // Przekształcanie tablicy recenzji w tablicę obietnic
        const reviewsWithUser = await Promise.all(
            reviews.map(
                async review => {
                    if (review.user_id){
                        const userDb = await userController.getById(review.user_id);
                        delete userDb.dataValues.password;
                        review.dataValues.user = userDb.dataValues;
                    }
                    return review;
        }));
        res.status(200).json( reviewsWithUser );
    } catch (err){
        console.error(err);
        sendError(req, res, 500, '500 internal server error');
    }
});
 

router.post('/add', upload.array('images'), async (req, res) => {
    const transaction = await sequelize.transaction();
    const errorData = {
        status: 500,
        msg: 'Internal server error'
    }
    
    try {
        const productData = req.body;
        // Clear variables without values
        for( const [key, value] of Object.entries( productData )){
            if (typeof value === 'string' && value){
                productData[key] = value.trim();
            }
            if (!value){
                delete productData[key]
            }
        }
        console.log( productData )
        
        if ( !isInRange( productData.name.length, 2 ,32) ){
            errorData.status = 400,
            errorData.msg = '400 Bad Request: Name length must be between 2 and 32';
            throw new Error('400 Bad Request: Name length must be between 2 and 32');
        } 
        
        if ( !Number(productData.price)){
            errorData.status = 400,
            errorData.msg = '400 Bad Request: Price must be number';
            throw new Error('400 Bad Request: Price must be number');
        }
        
        if( productData.available_stock){
            if(!isIntegerString( productData.available_stock)){
                errorData.status = 400,
                errorData.msg = '400 Bad Request: Available stock must be number';
                throw new Error('400 Bad Request: Available stock must be number');
            } 
            if ( !isInRange( Number(productData.available_stock), 0 , 1024)){
                errorData.status = 400,
                errorData.msg = '400 Bad Request: Available stock must be between 0 and 1024';
                throw new Error('400 Bad Request: Available stock must be between 0 and 1024');
            }
        }
        
        if( productData.category_id && !isIntegerString( productData.category_id)){
            errorData.status = 400,
            errorData.msg = '400 Bad Request: Bad category id';
            throw new Error('400 Bad Request: Bad category id');
        }
        
        const productDb = await productController.createProduct( productData );
        
        if (productData.category_id) {
            const categoryDb = await categoryController.getById( productData.category_id);
            await productController.setCategory( productDb, categoryDb);
        };
        
        
        if (req.files){
            for (const img of req.files){
                const photoDb = await pictureController.createPicture({
                    name: img.filename,
                    url: img.destination + img.filename,
                    
                })
                await pictureController.setProduct( photoDb, productDb);
            }}
            
        await transaction.commit();
        res.json(  { msg: 'Succes create product', created: true} );
    } catch (err){
        if (req.files){
            for (const img of req.files){
                deleteFile( img.destination + img.filename)
        }}
        await transaction.rollback();
        console.error(err);
        sendError(req, res, errorData.status , errorData.msg );
    }
});


router.get('/get/all', async (req, res) => {
    try {
        const productsDb = await productController.getAll();;
        res.status(200).json( productsDb );
    } catch(err){
        console.error(err);
        sendError(req, res, 500, '500 internal Server Error');
    }
});


router.get('/:id', async (req, res) => {
    try{
        const { id } = req.params;
        if (!isIntegerString(id)) return sendError(req, res, 400, '400 Bad request: Bad id');
        
        const productDb = await productController.getById(id); 
        res.status(200).json( productDb );
    } catch (err){
        console.error(err);
        sendError( req, res, 500, '500 Internal Server Error');
    }
})


router.get('/:productId/pictures', async (req, res) => {
    try {
        const { productId } = req.params;
        if (!isIntegerString(productId)) return sendError(req, res, 400, '400 Bad Request: Bad productId');
        
        const pictures = await pictureController.getByProductId(productId);
        res.json( pictures);
    } catch (err){
        console.error(err);
        sendError( req, res, 500, '500 Internal Server Error');
    }
});


export default router;