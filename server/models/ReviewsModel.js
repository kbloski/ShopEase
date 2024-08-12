import { sequelize } from "../utility/db.js";
import { DataTypes } from "sequelize";

const Reviews = sequelize.define('Reviews', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        validate: {
            isInt: true
        }
    },

    rating: {
        type: DataTypes.DECIMAL(1,1),
        allowNull: false,
        validate: {
            isDecimal: true
        }
    },

    comment: {
        type: DataTypes.STRING(256),
        allowNull: true,
        validate: {
            len: [0,256]
        }

    }
})

export {
    Reviews
}