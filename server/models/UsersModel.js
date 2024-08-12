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
        unique: true,
        validate: {
            isEmail: true,
            len: [0, 128]
        }
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg:  'Password is needed'},
            notEmpty: { msg: 'Please provide a password' },
            isNotEasy: function (value){
                if (value )
            }
        }

    },

    name: {
        type: DataTypes.STRING(16)
    }
});