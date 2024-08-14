import express from 'express';
import expressSession from 'express-session';
import cors from 'cors';
import { webTokenController} from './utility/auth.js';
import { categoryController, userController } from './controllers/controllers.js';
import { registerUser } from './middlewares/register.js';
import { userLogin } from './middlewares/login.js';

const app = express();

// CORS (Cross-Origin Resource Sharing) to mechanizm bezpieczeństwa, który kontroluje, które zasoby na serwerze mogą być dostępne z różnych domen, zapobiegając nieautoryzowanemu dostępowi. Działa poprzez dodanie odpowiednich nagłówków HTTP, które umożliwiają lub blokują żądania między różnymi źródłami.
app.use(cors());
// app.use(cors({
//     origin: 'http://localhost:3000', // lub '*' dla wszystkich źródeł
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization']
// }));

// app.use(express.urlencoded( {extended: false }));

// ** parsowanie danych odebranych w json
// app.use(express.json());
// app.use(bodyParser.text({ type: 'application/json' }));

app.use((req, res, next) => { // my middleware to manual get data 
    let data = '';
    req.on('data', chunk => {
        data += chunk;
    });
    req.on('end', () => {
        if (data) req.body = JSON.parse(data);
        next();
    });
}); 

app.use(express.static('./public'));






app.get('/api/products')

app.get('/api/login', 
    (req, res, next) => {
        req.body = {
            email: 'admin@example.com',
            password: 'test'
        }
        next();
    },  
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
                token: token
            } );
        } else {
            res.json({
                getToken: false
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