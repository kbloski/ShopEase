import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage(
    {
        destination: function(req, file, cb){
            cb(null, './uploads/products_data/img/');
        },
        filename: function(req, file, cb){
            cb(null, Date.now() + path.extname(file.originalname) );
        }
    }
)
const upload = multer( {storage: storage});

// Tak, middleware multer jest kluczową poprawką, ponieważ to właśnie on odpowiada za parsowanie i obsługę przesyłanych plików na serwerze. 
// danych z formularza w postaci multipart, czyli pliki i dane

export {
    upload
}





