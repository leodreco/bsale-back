import { Request, Response, NextFunction } from 'express';

function filterMiddleware(req: Request, res: Response, next: NextFunction){
    req.skip = Number(req.query.skip ?? 0);
    req.take = Number(req.query.take ?? 10);
    if(isNaN(req.skip)){
        req.skip = 0;
    }
    if(isNaN(req.take)){
        req.take = 10;
    }
    next();
}

export default filterMiddleware;
