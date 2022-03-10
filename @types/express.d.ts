declare namespace Express {
    export interface Request {
       skip: number,
       take: number,
       filters: any,
       orderBy: any,
    }
  }