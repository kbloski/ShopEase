import express from 'express';
import { categoryController } from '../controllers/controllers.js';

const router = express.Router();

router.get('/all', async (req, res) => {
    const categoryArr = await categoryController.getAll();
    res.status(200).json(categoryArr);
})

export default router;