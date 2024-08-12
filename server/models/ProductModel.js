import { sequelize } from "../utility/db.js";
import { DataTypes } from "sequelize";

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        validate: {
            isInt: true
        }
    },

    name: {
        type: DataTypes.STRING(64),
        allowNull: false,
        validate: { len: [0,64]}
    },

    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },

    price: {
        type: DataTypes.DECIMAL(7,2),
        allowNull: false,
        validate: {
            isDecimal: true
        }
    },

    available_stock: {
        type: DataTypes.INTEGER(4).UNSIGNED,
        allowNull: true,
        validate: {
            isInt: true,
            min: 0,
            max: 1024
        }
    },
    
});

export {
    Product
};