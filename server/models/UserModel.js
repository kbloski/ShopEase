import { sequelize } from "../utility/db.js";
import { DataTypes } from "sequelize";

const rolesArr = [
    'customer',
    'admin', 
    'shop_manager',
    'product_manager', 
    'support_customer',
    ]

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        validate: {
            isInt: true
        }
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        // unique: true,
        validate: {
            isEmail: true,
            len: [5, 128],
            // isUnique: function(value){
                
            // }
        }
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
        
        validate: {
            len: [4, 128],
            notNull: { msg:  'Password is needed'},
            notEmpty: { msg: 'Please provide a password' },
            isNotEasy: function (value){
                const arrSimplePasswords = [
                    'haslo1234',
                    'haslo4321',
                    'haslo'
                ]
                if (arrSimplePasswords.indexOf(value) != -1) throw new Error('Password is too simple')
            }
        }

    },

    role: {
        type: DataTypes.ENUM(...rolesArr),
        defaultValue: 'customer',
        allowNull: false,
        validate: {
            isIn: [rolesArr]
        }
    },

    name: {
        type: DataTypes.STRING(64),
        allowNull: false,
        validate: {
            len: [2,64]
        }
    },
    surname: {
        type: DataTypes.STRING(64),
        allowNull: false,
        validate: {
            len: [2,64]
        }
    },
    age: {
        type: DataTypes.TINYINT.UNSIGNED,
        allowNull: true,
        validate: {
            min: 18,
            max: 140
        }
    },
    phone: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            len: [9,9]
        }
    },
    
});

export {
    User
}