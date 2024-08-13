import express from 'express';
import expressSession from 'express-session';

const app = express();

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



// app.post('/api/login', ( req, res) => {
//     console.log(req.body)
// }); 




app.listen(3010, ()=>{
    console.log('Server started at port 3010')
});