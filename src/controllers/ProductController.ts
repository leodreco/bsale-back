import { PrismaClient } from '@prisma/client'
import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    const prisma = new PrismaClient();

    try{
        const products = await prisma.product.findMany({
            skip: req.skip,
            take: req.take,
            where: req.filters,
            orderBy: req.orderBy,
        });
    
        let totalRows = await prisma.product.count({
            where: req.filters,
        });
    
        return res.json({
            success: true,
            data: products,
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
