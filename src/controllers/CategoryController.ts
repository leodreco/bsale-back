import { PrismaClient } from '@prisma/client'
import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    const prisma = new PrismaClient();
    const categories = await prisma.category.findMany();
    return res.json({
        success: true,
        data: categories,
        message: null,
    });
});

export default router;
