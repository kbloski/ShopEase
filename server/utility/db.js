import { Sequelize } from 'sequelize';

const PORT = 3306;
const DATABASE = 'shopeasy';

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
    sequelize,
    
};
