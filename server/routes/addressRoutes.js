import express from 'express';
import { sendError, sendSuccess } from '../utility/errorUtils.js';
import { addressController, userController } from '../controllers/controllers.js';

const router = express.Router();

router.post('/create-for-user', async (req, res) => {
    try {
        if (!req.user) return sendError(req, res, 401, '401 Unauthorized')

        const userDb = await userController.getById( req.user.id);
        
        let msg = 'Create address'
        if (userDb.address_id){
            msg = 'Update adress'
            await addressController.updateById( userDb.address_id, req.body)
        } else {
            console.log('Create')
            const adressDb =  await addressController.createAddress( req.body);
            await userController.updateAddressByUserId( userDb.id, adressDb);
        }

        sendSuccess( req, res, 200, { msg })
    } catch (err){
        console.error(err);
        sendError(req, res, 500, '500 Internal Server Error');
    }
});

router.get('/for-user/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId) return sendError(req, res, 400, '400 Bad Request');

        const userDb = await userController.getById(userId);
        if (!userDb) return sendError(req, res, 400, '400 Bad Request: Don\'t find user')

        const address = await addressController.getById( userDb.address_id);
        await userController.updateAddress( userDb, address);

        sendSuccess( req, res, 200, { 
            data: address ?? { address: 'No exists'}
        })
    } catch (err){
        console.error(err);
        sendError(req, res, 500, '500 Internal Server Error');
    }
}); 

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return sendError(req, res, 400, '400 Bad Request');

        const address = await addressController.getById( id );

        if (!address) return sendError(req, res, 404, '404 Not Found')

        sendSuccess( req, res, 200, { 
            data: address.dataValues
        })
    } catch (err){
        console.error(err);
        sendError(req, res, 500, '500 Internal Server Error');
    }
}); 

// router.put('/id);

router.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        if (!id) return sendError(req, res, 400, '400 Bad Request');

        await addressController.deleteById( id );
        sendSuccess(req, res, 200, { data: {deleted: true}});
    } catch (err){
        console.error( err );
    }
})

export default router;