import { PrismaClient } from '@prisma/client'
import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    const prisma = new PrismaClient();

    const products = await prisma.product.findMany({
        skip: req.skip,
        take: req.take,
        where: req.filters,
        orderBy: req.orderBy,
    });

    let count = await prisma.product.count({
        where: req.filters,
    });

    return res.json({
        success: true,
        data: products,
        message: null,
        totalRows: count,
    });
});

export default router;
