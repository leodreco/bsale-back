import { Request, Response, NextFunction } from 'express';
import { isNumberObject } from 'util/types';

function filterMiddleware(req: Request, res: Response, next: NextFunction){
    req.skip = Number(req.query.skip ?? 0);
    req.take = Number(req.query.take ?? 10);
    if(isNaN(req.skip)){
        req.skip = 0;
    }
    if(isNaN(req.take)){
        req.take = 10;
    }

    /**
     * {
     *  "filters": [
     *      "key": {
     *          "value": "search",
     *          "matchMode": "contains|endsWith|equals|gt|gte|in|lt|lte|not|notIn|startsWith",
     *      }
     *  ],
     *  "sortField": "key",
     *  "sordOrder": "desc|asc",
     * }
     */
    if(!!req.query.filters){
        let lazy: any = {};
        try{
            lazy = JSON.parse(String(req.query.filters));
        }catch(e){
            return res.status(400).json({
                success: false,
                message: 'Filtros no válidos',
            });
        }
        if(!!lazy.filters){
            req.filters = {};
            for(let fieldName in lazy.filters){
                let filter = lazy.filters[fieldName];
                req.filters[fieldName] = {};
                req.filters[fieldName][filter.matchMode] = Number.isNaN(filter.value) ? Number(filter.value) : filter.value;
            }
        }
        if(!!lazy.sortField){
            req.orderBy = {};
            req.orderBy[lazy.sortField] = 'desc';
            if(!!lazy.sortOrder){
                req.orderBy[lazy.sortField] = lazy.sortOrder;
            }
        }
    }
    next();
}

export default filterMiddleware;
