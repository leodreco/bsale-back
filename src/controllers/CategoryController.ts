import { PrismaClient } from '@prisma/client'
import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    const prisma = new PrismaClient();

    const categories = await prisma.category.findMany({
        skip: req.skip,
        take: req.take,
        where: req.filters,
        orderBy: req.orderBy,
    });

    let totalRows = await prisma.category.count({
        where: req.filters,
    });

    return res.json({
        success: true,
        data: categories,
        message: null,
        totalRows: totalRows,
    });
});

export default router;
