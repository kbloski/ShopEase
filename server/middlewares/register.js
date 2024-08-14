import { userController } from "../controllers/controllers.js";

const registerUser = async (req, res, next) => {
    try {
        // return { created, msg}

        const userExists = await userController.getUserByEmail(req.body.email);

        if (userExists) {
            req.registerCallback = {
                created: false,
                msg: 'User exist in database'
            };
            next();
        }

        // Add functions mgs for check password, name, surname, itd..

        const userData = {
            email: req.body.email,
            password: req.body.password,
            name: req.body.name,
            surname: req.body.surname,
            age: req.body.age ? req.body.age : null,
            phone: req.body.phone ? req.body.phone : null
        };
    
        const userDb = await userController.createUser( userData);

        req.registerCallback = {
            created: true,
            msg: 'Create user success'
        }
        
        next();
    }catch (err) {
        
        res.statusCode = 500;
        res.end('HTTP 500 : Internal Server Error - middleware register ')
    }
    
}


export {
    registerUser
}