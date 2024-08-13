import express from 'express';
import expressSession from 'express-session';
import cors from 'cors';
import {passport} from './utility/auth.js';

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
        req.body = data;
        next();
    });
});

app.use(express.static('./public'));

app.use(expressSession({
    secret: 'mY_s3creT_C0oD3',
    resave: false,
    saveUninitialized: true
}));

// ** passportJs
app.use(passport.initialize());
app.use(passport.session());




app.get('/', (req,res)=>{
    res.setHeader('Content-Type', 'application/json');
    const msg = { msg: "Server started"}
    res.json(msg);
});

app.post('/api/register', 
    async (req, res, next) => {
        req.body = JSON.parse(req.body);
        next();
    }, 
    passport.authenticate('local-register', {
    }),
    (req, res) => {
        res.json( {user: req.user } )
    }

    
)

app.listen(3010, ()=>{
    console.log('Server started at port 3010')
});