import { sequelize } from "../utility/db.js";
import { DataTypes } from "sequelize";

const Users = sequelize.define('Users', {
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
            len: [0, 128],
            // isUnique: function(value){
                
            // }
        }
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
        
        validate: {
            len: [5, 100],
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

    name: {
        type: DataTypes.STRING(16),
        allowNull: false,
        validate: {
            len: [5,16]
        }
    },
    surname: {
        type: DataTypes.STRING(32),
        allowNull: false,
        validate: {
            len: [5,32]
        }
    },
    age: {
        type: DataTypes.TINYINT.UNSIGNED,
        allowNull: true,
        validate: {
            min: 18
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
    Users
}