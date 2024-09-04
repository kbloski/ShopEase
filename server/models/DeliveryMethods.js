import { DataTypes } from "sequelize";
import { sequelize } from "../utility/db.js";

const DeliveryMethods = sequelize.define('DeliveryMethods', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        validate: {
            isInT: true
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [0,32]
        }
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: { len: [0,1024]}
    },
    price: {
        type: DataTypes.DECIMAL(3,2),
        allowNull: true,
        validate: {
            isDecimal: true
        }
    }
})

export { DeliveryMethods };