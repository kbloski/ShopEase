import express from 'express';
import { pictureController } from '../controllers/controllers.js';
import path from 'path';
import { isNumberObject } from 'util/types';
import { isIntegerString } from '../utility/validate.js';

const router = express.Router();


router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (!isIntegerString(id) )  return sendError(req, res, 400, '400 Bad Request: Bad picture id'); 

        const picture = await pictureController.getById(id);
        if (!picture) return sendError(req, res, 404, '404 Not found: Picture don\'t exist in database'); 

        res.sendFile( path.resolve( picture.url) );
    } catch (err){
        console.error(err);
        sendError(req, res, 500, '500 internal server error');        
    }
});


export default router;