import { Request, Response, NextFunction } from 'express';


/**
 * {
 *  "filters": [
 *      "key": {
 *          "value": "search",
 *          "matchMode": "contains|endsWith|equals|gt|gte|in|lt|lte|not|notIn|startsWith",
 *      }
 *  ],
 *  "sortField": "key",
 *  "sortOrder": "desc|asc",
 *  "skip": 0,
 *  "take": 12
 * }
 */
function filterMiddleware(req: Request, res: Response, next: NextFunction){
    req.skip = Number(req.query.skip ?? 0);
    req.take = Number(req.query.take ?? 10);
    if(isNaN(req.skip)){
        req.skip = 0;
    }
    if(isNaN(req.take)){
        req.take = 10;
    }
    if(!!req.query.filters){
        if(!!req.query.filters){
            let lazy: any = req.query.filters;
            req.filters = {};
            for(let fieldName in lazy){
                let filter = lazy[fieldName];
                req.filters[fieldName] = {};
                req.filters[fieldName][filter.matchMode] = !isNaN(filter.value) ? Number(filter.value) : filter.value;
            }
        }
    }

    if(!!req.query.sortField){
        let sortField: string = req.query.sortField.toString();
        req.orderBy = {};
        req.orderBy[sortField] = 'asc';
        if(!!req.query.sortOrder){
            let sortOrder: string = req.query.sortOrder.toString();
            req.orderBy[sortField] = sortOrder;
        }
    }

    next();
}

export default filterMiddleware;
