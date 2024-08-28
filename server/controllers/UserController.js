import { User } from "../models/schemas.js";
import bcrypt from 'bcryptjs';
import { addressController, userController } from "./controllers.js";
import { where } from "sequelize";

export class UserController {
    async getAll(){
        return await User.findAll({});
    };
    
    async getById(id){
        return await User.findByPk(id);
    } 

    async createUser(userData, addressDb){
        const salt = await bcrypt.genSalt(10);
        userData.password = await bcrypt.hash(userData.password, salt);

        const userDb = User.create(userData);

        if (addressDb) await userDb.setAddress(addressDb);

        return userDb;
    };

    async updateAddress( userDb, addressDb){
        return await userController.updateById( { adress_id: addressDb.id }, {where: { id: userDb.id } }  )
    }
    
    async updateById(id, userData){
        const updatedUser = await User.update(userData, {
            where: {
                id: id
            }
        });

        return updatedUser;
    }

    async validPassword(password, userDb){
        try {
            if (!password || !userDb) return false;

            return await bcrypt.compare(password, userDb.password)
            

        } catch(err){
            throw new Error(err)
        }
    };

    async getUserByEmail(email){
        const userDb = await User.findOne({where: {email: email}});
        return userDb;
    }
};


