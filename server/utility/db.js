import { Sequelize } from 'sequelize';
import mysql2 from 'mysql2';


const PORT = 3306;
const DATABASE = 'shopeasy';
const connection = mysql2.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    port: PORT
});
connection.query(`CREATE DATABASE IF NOT EXISTS  CHARACTER SET utf8 COLLATE utf8_general_ci`, (err,result) => {
    if (err) { 
        console.log('Baza danych już istnieje: ' + DATABASE)
    } else {
        console.log('Utworzono nową bazę danych: ' + DATABASE)
    }
});
connection.end();



const sequelize = new Sequelize({
    database: DATABASE,
    dialect: 'mysql',
    host: '127.0.0.1',
    username: 'root',
    password: '',
    port: PORT,
});
sequelize.authenticate()
    .then(() => {
        console.log('Connected with database at port ' + PORT);
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });



export {
    sequelize
};
