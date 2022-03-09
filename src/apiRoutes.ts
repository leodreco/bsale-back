import { Router } from 'express';
import ProductController from './controllers/ProductController';
import CategoryController from './controllers/CategoryController';

const router = Router();
router.use('/product', ProductController);
router.use('/category', CategoryController);

export default router;
