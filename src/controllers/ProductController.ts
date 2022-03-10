import { PrismaClient } from '@prisma/client'
import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    let skip = Number(req.query.skip ?? 0);
    let take = Number(req.query.take ?? 10);

    const prisma = new PrismaClient();
    const products = await prisma.product.findMany({
        skip,
        take,
    });
    let count = await prisma.product.count();

    return res.json({
        success: true,
        data: products,
        message: null,
        totalRows: count,
    });
});

export default router;
