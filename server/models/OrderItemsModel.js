import { sequelize } from "../utility/db.js";
import { DataTypes } from "sequelize";

const OrderItems = sequelize.define('OrderItems', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        validate: {
            isInt: true
        }
    },

    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { isInt: true}
    },

    product_price: {
        type: DataTypes.DECIMAL.UNSIGNED,
        allowNull: false,
        validate: { isDecimal: true}
    }

});

export {
    OrderItems
}