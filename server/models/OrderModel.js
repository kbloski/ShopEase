import { sequelize } from "../utility/db.js";
import { DataTypes } from "sequelize";

const arrStatus = [
    'in_cart',   // w koszyku
    'placed', // złożone 
    'processing', // przetwarzane
    'shipped', // wysłane
    'delivered', // dostarczone
    'cancelled', // anulowane
    'returned', // zwrócone
    
]

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        validate: {
            isInt: true
        }
    },

    status: {
        type: DataTypes.ENUM(...arrStatus),
        allowNull: false,
        defaultValue: 'in_cart',
        validate: {
            isIn: [arrStatus],
        }
    }

});

export {
    Order
}
