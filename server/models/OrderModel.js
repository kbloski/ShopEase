import { sequelize } from "../utility/db.js";
import { DataTypes } from "sequelize";

const arrStatus = [
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
        defaultValue: 'placed',
        validate: {
            isIn: [arrStatus],
        }
    }

});

export {
    Order
}
