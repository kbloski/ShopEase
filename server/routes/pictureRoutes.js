import express from 'express';
import { pictureController } from '../controllers/controllers.js';
import path from 'path';

const router = express.Router();


router.get('/:id', async (req, res) => {
    const { id } = req.params;
    if (!id) res.status(500).json( { msg: 'Don\t have id for picture'} );
    
    const picture = await pictureController.getById(id);
    let filePath = picture.url;
    

    res.sendFile( path.resolve( filePath) );
});


export default router;