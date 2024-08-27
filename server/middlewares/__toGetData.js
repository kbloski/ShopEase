// Middleware do pobrania danych z serwrea

// app.use((req, res, next) => { 
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