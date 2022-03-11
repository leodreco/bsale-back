import { prisma } from '../db/prismaClient';
import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    try{
        const categories = await prisma.category.findMany({
            skip: req.skip,
            take: req.take,
            where: req.filters,
            orderBy: req.orderBy,
        });

        let totalRows = await prisma.category.count({
            where: req.filters,
        });

        await prisma.$disconnect();

        return res.json({
            success: true,
            data: categories,
            message: null,
            totalRows,
        });
    }catch(e){
        return res.status(500).json({
            success: false,
            message: 'Error desconocido',
        });
    }
});

export default router;
