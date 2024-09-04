import productRoutes from './routes/productRoutes.js';
import authRoutes from './routes/authRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import pictureRoutes from './routes/pictureRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import deliveries from './routes/deliveries.js';

const registerRoutes = (app) => {
    app.use('/api', authRoutes);
    app.use('/api/products', productRoutes);
    app.use('/api/categories', categoryRoutes)
    app.use('/api/pictures', pictureRoutes)
    app.use('/api/reviews', reviewRoutes);
    app.use('/api/orders', orderRoutes);
    app.use('/api/deliveries', deliveries)
}


export default registerRoutes;