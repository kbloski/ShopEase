import express from 'express';

import { webTokenController} from '../utility/auth.js';
import { registerUser} from '../middlewares/register.js';
import { userLogin } from '../middlewares/login.js';

const router = express.Router();

router.post('/login', 
    userLogin,
    (req, res) => {
        res.statusCode = 200;

        

        if (req?.user) {
            const userData = req.user.dataValues;
            delete userData.password 
            delete userData.createdAt 
            delete userData.updatedAt 

            const token = webTokenController.createWebToken( userData )    

            res.json( {
                getToken: true,
                token: token,
                msg: 'Logged in'
            } );
        } else {
            res.json({
                getToken: false,
                msg: 'Not logged in'
            })
        }
        
    }
)


router.post('/register', 
    registerUser,
    async (req, res) => {
        res.statusCode = 200;
        res.json( req.registerCallback ) 
    }
)

export default router;