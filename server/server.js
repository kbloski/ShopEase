import express from 'express';
import expressSession from 'express-session';
import cors from 'cors';
import { webTokenController} from './utility/auth.js';
import { categoryController, photoController, productController, userController } from './controllers/controllers.js';
import { registerUser } from './middlewares/register.js';
import { userLogin } from './middlewares/login.js';
import { upload } from './utility/uploadFiles.js';
import { canTreatArrayAsAnd } from 'sequelize/lib/utils';

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
            const photoDb = await photoController.createPicture({
                name: img.filename,
                url: img.destination
            })

            await photoController.setProduct( photoDb, productDb);
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