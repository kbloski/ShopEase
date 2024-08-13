import express from 'express';
import expressSession from 'express-session';
import cors from 'cors';
import { Json } from 'sequelize/lib/utils';

const app = express();

// CORS (Cross-Origin Resource Sharing) to mechanizm bezpieczeństwa, który kontroluje, które zasoby na serwerze mogą być dostępne z różnych domen, zapobiegając nieautoryzowanemu dostępowi. Działa poprzez dodanie odpowiednich nagłówków HTTP, które umożliwiają lub blokują żądania między różnymi źródłami.
app.use(cors());
// app.use(cors({
//     origin: 'http://localhost:3000', // lub '*' dla wszystkich źródeł
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization']
// }));




app.use(express.urlencoded( {extended: false }));
app.use(expressSession({
    secret: 'mY_s3creT_C0oD3',
    resave: false,
    saveUninitialized: true
}));
app.use(express.static('./public'));



app.get('/', (req,res)=>{
    res.setHeader('Content-Type', 'application/json');
    const msg = { msg: "Server started"}
    res.json(msg);
});

app.post('/api/register', (req, res) => {
    
    res.send( JSON.stringify( {msg: 'Test połaczenia' } ));
})

app.listen(3010, ()=>{
    console.log('Server started at port 3010')
});