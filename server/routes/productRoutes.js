import express from 'express';
import { productController, pictureController, reviewController, userController, categoryController } from '../controllers/controllers.js';
import { upload } from '../utility/uploadFiles.js';

const router = express.Router();



router.get('/:productId/reviews', async (req, res) => {
    const { productId } = req.params;
    if (!productId) throw new Error('Error api - /api/product/:productId/reviews - don\'t give productId');

    const reviews = await reviewController.getAllByProductId(productId);

    // Przekształcanie tablicy recenzji w tablicę obietnic
    const reviewsWithUser = await Promise.all(reviews.map(async review => {
        if (review.userId){
            const userDb = await userController.getById(review.userId);
            delete userDb.dataValues.password;
            review.dataValues.user = userDb.dataValues;
        }
        return review;
    }));

    res.json( reviews );
});

router.post('/add', upload.array('images'), async (req, res) => {
    const { name, description, price, available_stock, categoryId } = req.body;
    
    if (!name) res.json( {msg: 'Error send picture', created: false });

    const productDb = await productController.createProduct({
        name: name, 
        description: description,
        price: price,
        available_stock: available_stock,
    });

    if (categoryId) {
        const categoryDb = await categoryController.getById( categoryId);
        await productController.setCategory( productDb, categoryDb);
    };

    if (req.files){
        for (const img of req.files){
            const photoDb = await pictureController.createPicture({
                name: img.filename,
                url: img.destination + img.filename,
            })

            await pictureController.setProduct( photoDb, productDb);
        }
    }
    res.json(  { msg: 'Succes add product', created: true} );
});


router.get('/get/all', async (req, res) => {
    const productsDb = await productController.getAll();;
    res.status(200).json( productsDb );
});




router.get('/:id', async (req, res) => {
    const { id } = req.params;
    if (!id) throw new Error('Error /api/product/id - not give id');

    const productDb = await productController.getById(id); 
    res.json( productDb );
})


router.get('/:productId/pictures', async (req, res) => {
    const { productId } = req.params;
    if (!productId ) throw new Error('Error /api/product/:productId/pictures - dont have productId');

    const pictures = await pictureController.getByProductId(productId);
    res.json( pictures);
});




export default router;