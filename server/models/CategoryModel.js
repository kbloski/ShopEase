import { sequelize } from "../utility/db.js";
import { DataTypes } from "sequelize";

const Category = sequelize.define('Category', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        validate: { isInt: true}
    },
    name: {
        type: DataTypes.STRING(32),
        allowNull: false,
        validate: {
            len: [0,32]
        }
    },

    description: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: { len: [0, 2048]}
    }
});



export {
    Category
}