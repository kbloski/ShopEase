import { sequelize } from "../utility/db.js";
import { DataTypes } from "sequelize";

const arrDeliveryStatus = [
    'pending',
    'shipped',
    'delivered',
    'cancelled'
]

const Delivery = sequelize.define('Delivery', {
    id: {
        type: DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        validate: {
            isInt: true
        }
    },

    price: {
        type: DataTypes.DECIMAL(3,2),
        allowNull: true,
        validate: {
            isDecimal: true
        }
    },

    delivery_method: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    
    delivery_status: {
        type: DataTypes.ENUM(...arrDeliveryStatus),
        allowNull: false,
        defaultValue: 'pending',
        validate: {
            isIn: [ arrDeliveryStatus ]
        }
    },
    
    shipment_date: {
        type: DataTypes.DATE,
        allowNull: true,
        validate: {
            isDate: true
        }
    },
    
    delivery_date: {
        type: DataTypes.DATE,
        allowNull: true,
        validate: {
            isDate: true
        }
    },

    tracking_number: {
        type: DataTypes.STRING,
        allowNull: true
    }
})

export {
    Delivery
}