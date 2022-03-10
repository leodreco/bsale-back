import { Router } from 'express';
import FilterMiddleware from './middlewares/FilterMiddleware';
import ProductController from './controllers/ProductController';
import CategoryController from './controllers/CategoryController';

const router = Router();
router.get('/*', FilterMiddleware);
router.use('/product', ProductController);
router.use('/category', CategoryController);

export default router;
