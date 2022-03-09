import { PrismaClient } from '@prisma/client'
import { Router, Request, Response } from 'express';
const router = Router();

router.get('/', async (req: Request, res: Response) => {
    const prisma = new PrismaClient();
    const products = await prisma.product.findMany();
    return res.json({
        success: true,
        data: products,
        message: null,
    });
});

export default router;
