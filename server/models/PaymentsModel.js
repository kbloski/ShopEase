import { sequelize } from "../utility/db.js";
import { DataTypes } from "sequelize";

const Payments = sequelize.define('Payments', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        validate: { isInt: true}
    },
    method: {
        type: DataTypes.STRING(32),
        allowNull: false,
        validate: {
            len: [0,32]
        }
    },
    amount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
            isDecimal: true
        }
    },
    payment_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        validate: {
            isDate: true
        }
    }

})

export {
    Payments
}