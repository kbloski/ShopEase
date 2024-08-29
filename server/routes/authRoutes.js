import express from 'express';
import { webTokenManager } from '../utility/tokenManager.js';
import { registerUser} from '../middlewares/register.js';
import { userLogin } from '../middlewares/login.js';
import { sequelize } from '../utility/db.js';
import { sendSuccess } from '../utility/errorUtils.js';

const router = express.Router();

router.post('/login', 
    userLogin,
    async (req, res) => { 
        try {
                if (!req.user) return sendSuccess(req, res, 200, { msg: 'Not logged in!'});
                    
                const userData = req.user.dataValues;
                delete userData.password;
                const token = webTokenManager.createWebToken( userData );  
                
                return sendSuccess(req, res, 200, { 
                    msg: 'Login success',
                    data: { token }
                })
        } catch (err){
            console.error(err);
            sendError(req, res, 500, '500 Interval Server Error');
        }
});

router.post('/register', 
    registerUser,
    async (req, res) => {
        try {
            sendSuccess(req, res, 201, { 
                msg: req.registrationStatus.created ? 'Create user' : 'User exists',
                data: req.registrationStatus 
            });
        } catch (err){
            console.error( err );
            sendError(req, res, 500, '500 Interval Server Error');
        }
    }
)

export default router;