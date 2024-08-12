import { sequelize } from "../utility/db.js";
import { Users } from "./UsersModel.js";

// TODO - add relations model in this place

await sequelize.sync();

export {
    Users
}

