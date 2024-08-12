import { sequelize } from "../utility/db.js";
import { DataTypes } from 'sequelize';

const Address = sequelize.define('Address', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        validate: {
            isInt: true
        }
    },
    street: {
        type: DataTypes.STRING(128),
        allowNull: false,
        validate: {
            len: [0,128]
        }
    },
    house_number: {
        type: DataTypes.STRING(8),
        allowNull: true,
        validate: {
            len: [0,8]
        }
    },
    city: {
        type: DataTypes.STRING(128),
        allowNull: false,
        validate: {
            len: [0,128]
        }
    },
    state: {
        type: DataTypes.STRING(128),
        allowNull: true,
        validate: {
            len: [0,128]
        }
    },
    postal_code: {
        type: DataTypes.INTEGER(5),
        allowNull: false,
        validate: {
            isInt: true
        }
    },

    country: {
        type: DataTypes.STRING(128),
        allowNull: false,
        validate: {
            len: [0,128]
        }
    },
    
})

export {
    Address
}