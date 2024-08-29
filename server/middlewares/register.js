import { validator } from "sequelize/lib/utils/validator-extras";
import { userController } from "../controllers/controllers.js";
import { sequelize } from "../utility/db.js";
import { sendError } from "../utility/errorUtils.js";
import { isInRange } from "../utility/validate.js";

const registerUser = async (req, res, next) => {
    const transaction = await sequelize.transaction();
    try {
        const userData = req.body;
        
        // Clear variables without values
        for( const [key, value] of Object.entries( userData)){
            if (typeof value === 'string'){
                userData[key] = value.trim();
            }
            if (!value){
                delete userData[key]
            }
        }
        
        if (!userData.email){
            await transaction.rollback();
            return sendError(req, res, 400, '400 Bad Request: Email has no value. Please provide email. ');
        } else if ( 
            !isInRange(userData.email.length, 5, 128)
        ){
            await transaction.rollback();
            return sendError(req, res, 400, '400 Bad Request: Email length must be between 5 and 128');
        } else if (
            !validator.isEmail( userData.email )
        ) {
            await transaction.rollback();
            return sendError( req, res, 400, '400 Bad Request: Incorrect email formats');
        }

        // TODO - ban special chars
        if (!userData.password){
            await transaction.rollback();
            return sendError(req, res, 400, '400 Bad Request: Password has no value. Please provide password. ');
        }  else if ( 
            !isInRange(userData.password.length, 4,128)
        ){
            await transaction.rollback();
            return sendError( req, res, 400, '400 Bad Request: Password length must be between 4 and 128')
        };
        
        
        if(!userData.name){
            await transaction.rollback();
            return sendError( req, res, 400, '400 Bad Request: Name has no value. Please provide name.')
        } else if (
            !isInRange(userData.name.length, 2, 16)
        ){
            await transaction.rollback();
            return sendError( req, res, 400, '400 Bad Request: Name length must be between 2 and 16')
        }
        
        if(!userData.surname){
            await transaction.rollback();
            return sendError( req, res, 400, '400 Bad Request: Name has no value. Please provide name.')
        } else if (
            !isInRange(userData.surname.length, 2,64)
        ){
            await transaction.rollback();
            return sendError( req, res, 400, '400 Bad Request: Name length must be between 2 and 16')
        }
        
        if (userData.age){
            console.log( !Number(userData.age) );
            if (!Number(userData.age) ){
                await transaction.rollback();
                return sendError( req, res, 400, '400 Bad Request: Age must be number');
            };
            
            if (
                !isInRange(userData.age, 18, 140)
            ){
                await transaction.rollback();
                return sendError( req, res, 400, '400 Bad Request: Age must between 18 and 140');
            };

        }

        if (userData.phone){
            if (!Number( userData.phone)){
                await transaction.rollback();
                return sendError( req, res, 400, '400 Bad Request: The phone can only contain numbers')
            }
            
            if ( userData.phone.length !== 9){
                await transaction.rollback();
                return sendError( req, res, 400, '400 Bad Request: The phone length must be 9')
            }
        }

        const userExists = await userController.getUserByEmail(req.body.email);
        if (userExists) {
            req.registrationStatus = { created: false };
            await transaction.rollback();
            return next();
        }
        
        const userDb = await userController.createUser( userData);
        req.registrationStatus = { created: true }
        return await transaction.commit();
    }catch (err) {
        await transaction.rollback();
        console.error( err );
    }
    next();
    
}


export {
    registerUser
}