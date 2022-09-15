import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export default function tokenMiddleware(req: Request, res: Response, next: NextFunction) {
    const authorization: string = req.headers.authorization || "";
    const token: string = authorization?.replace("Bearer ", "").trim();
    const secretKey: string = process.env.JWT_SECRET || "";
        
    const retornoJWT = jwt.verify(token, secretKey);
    
    if(!authorization || !retornoJWT){
        throw {code: "unauthorized", message: "Token inválido."};
    }
    
    res.locals.retornoJwtVerify = retornoJWT;
    next();
  }