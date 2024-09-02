import express from 'express';
import cors from 'cors';
import registerRoutes from './index.js';
import { authorizeHeaderToken } from './middlewares/authorizedHeaderToken.js';

const app = express();

/*
 CORS (Cross-Origin Resource Sharing) to mechanizm bezpieczeństwa, który kontroluje, które zasoby na serwerze mogą być dostępne z różnych domen, zapobiegając nieautoryzowanemu dostępowi. Działa poprzez dodanie odpowiednich nagłówków HTTP, które umożliwiają lub blokują żądania między różnymi źródłami.
*/
 app.use(cors({
    origin: (origin, callback) => {
        const allowedOrigins = ['http://localhost:3000'];
        if (allowedOrigins.includes(origin) || !origin){
            callback( null, true);
        } else {
            callback( new Error('Not allowed by CORS'));
        }
    } , 
    
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.static('./public'));
app.use( authorizeHeaderToken );

registerRoutes(app);

app.get('/', (req,res)=>{
    res.setHeader('Content-Type', 'application/json');
    const msg = { msg: "Server started"}
    res.json(msg);
});

app.listen(3010, ()=>{
    console.log('Server started at port 3010')
});





