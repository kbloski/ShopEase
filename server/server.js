import express from 'express';
import cors from 'cors';
import path from 'path';
import { webTokenController} from './utility/auth.js';
import { categoryController, productController, pictureController, reviewController, userController } from './controllers/controllers.js';
import { registerUser } from './middlewares/register.js';
import { userLogin } from './middlewares/login.js';
import { upload } from './utility/uploadFiles.js';


const app = express();

// CORS (Cross-Origin Resource Sharing) to mechanizm bezpieczeństwa, który kontroluje, które zasoby na serwerze mogą być dostępne z różnych domen, zapobiegając nieautoryzowanemu dostępowi. Działa poprzez dodanie odpowiednich nagłówków HTTP, które umożliwiają lub blokują żądania między różnymi źródłami.
app.use(cors({
    origin: 'http://localhost:3000', // lub '*' dla wszystkich źródeł
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use(express.static('./public'));

app.get('/api/product/:productId/reviews', async (req, res) => {
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

    // const userDb = await userController.getById( reviews)
    console.log( reviewsWithUser )

    res.json( reviews );
});

app.get('/api/product/:id', async (req, res) => {
    const { id } = req.params;
    if (!id) throw new Error('Error /api/product/id - not give id');

    const productDb = await productController.getById(id); 
    res.json( productDb );
})

app.get('/api/product/:productId/pictures', async (req, res) => {
    const { productId } = req.params;
    if (!productId ) throw new Error('Error /api/product/:productId/pictures - dont have productId');

    const pictures = await pictureController.getByProductId(productId);
    res.json( pictures);
});

app.get('/api/picture/:id', async (req, res) => {
    const { id } = req.params;
    if (!id) res.status(500).json( { msg: 'Don\t have id for picture'} );
    
    const picture = await pictureController.getById(id);
    let filePath = picture.url;
    

    res.sendFile( path.resolve( filePath) );
});

app.get('/api/product/get/all', async (req, res) => {
    const productsDb = await productController.getAll();;
    res.status(200).json( productsDb );
});

app.get('/api/categories/all', async (req, res) => {
    const categoryArr = await categoryController.getAll();
    res.status(200).json(categoryArr);
})
app.post('/api/product/add', upload.array('images'), async (req, res) => {
    const { name, description, price, avaible_stock, categoryId } = req.body;
    
    console.log( name, description, price, avaible_stock, categoryId)
    if (!name) res.json( {msg: '', created: false });

    const productDb = await productController.createProduct({
        name: name, 
        description: description,
        price: price,
        avaible_stock: avaible_stock,
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

app.post('/api/login', 
    userLogin,
    (req, res) => {
        res.statusCode = 200;
        if (req?.user) {
            const userData = req.user.dataValues;
            delete userData.password 
            delete userData.createdAt 
            delete userData.updatedAt 

            const token = webTokenController.createWebToken( userData )    

            res.json( {
                getToken: true,
                token: token,
                msg: 'Logged in'
            } );
        } else {
            res.json({
                getToken: false,
                msg: 'Not logged in'
            })
        }
        
    }
)

app.post('/api/register', 
    registerUser,
    async (req, res) => {
        res.statusCode = 200;
        res.json( req.registerCallback ) 
    }
)

app.get('/', (req,res)=>{
    res.setHeader('Content-Type', 'application/json');
    const msg = { msg: "Server started"}
    res.json(msg);
});

app.listen(3010, ()=>{
    console.log('Server started at port 3010')
});






// ** parsowanie danych odebranych w json
// app.use((req, res, next) => { // my middleware to manual get data 
//     let data = '';
//     req.on('data', chunk => {
//         data += chunk;
//     });
//     req.on('end', () => {
//         if (data) 
//             try {
//                 req.body = JSON.parse(data);
//             } catch{
//                 req.body = data;
//             }

//         next();
//     });
// }); 