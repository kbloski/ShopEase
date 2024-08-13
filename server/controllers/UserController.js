import { User } from "../models/schemas.js";
import bcrypt from 'bcryptjs';

export class UserController {
    async getAll(){
        return await User.findAll({});
    };
    
    async getById(id){
        return await User.findByPk(id)
    } 

    async createUser(userData){
        const salt = await bcrypt.genSalt(10);
        userData.password = await bcrypt.hash(userData.password, salt);

        const userDb = User.create(userData);
        return userDb;
    };

    async updateAddress( userDb, addressDb){
        await userDb.setAddress(addressDb);
    }

    async validPassword(password, userDb){
        try {
            if (!password || !userDb) return false;

            return await bcrypt.compare(password, userDb.password)
            

        } catch(err){
            throw new Error(err)
        }
    };

    async updateById(id, userData){
        const updatedUser = await User.update(userData, {
            where: {
                id: id
            }
        });

        return updatedUser;
    }

    async getUserByEmail(email){
        const userDb = await User.findOne({where: {email: email}});
        return userDb;
    }
};


