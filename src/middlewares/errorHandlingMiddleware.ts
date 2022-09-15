import { Request, Response, NextFunction } from "express";

export default function errorHandlingMiddleware(error: any, req: Request, res: Response, next: NextFunction){

    if(error.code === "conflict") return res.status(409).send(error.message);

    if(error.code === "unauthorized") return res.status(401).send(error.message);
    
    if(error.code === "not found") return res.status(404).send(error.message);

    return res.sendStatus(500);
}