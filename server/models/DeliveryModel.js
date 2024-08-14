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

    deliveryMethod: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    
    deliveryStatus: {
        type: DataTypes.ENUM(...arrDeliveryStatus),
        allowNull: false,
        defaultValue: 'pending',
        validate: {
            isIn: [ arrDeliveryStatus ]
        }
    },
    
    shipmentDate: {
        type: DataTypes.DATE,
        allowNull: true,
        validate: {
            isDate: true
        }
    },
    
    deliveryDate: {
        type: DataTypes.DATE,
        allowNull: true,
        validate: {
            isDate: true
        }
    },

    trackingNumber: {
        type: DataTypes.STRING,
        allowNull: true
    }
})

export {
    Delivery
}