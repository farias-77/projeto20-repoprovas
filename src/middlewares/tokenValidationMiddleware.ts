import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export default function tokenMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const authorization: string = req.headers.authorization || "";
        const token: string = authorization?.replace("Bearer ", "").trim();
        const secretKey: string = process.env.JWT_SECRET || "";
            
        if(!authorization){
            throw {code: "unauthorized", message: "Invalid token."};
        }
        
        const retornoJWT = jwt.verify(token, secretKey);
        
        res.locals.retornoJwtVerify = retornoJWT;
        next();
    } catch (error) {
        throw{type: "unauthorized", message: "Invalid token."};
    }   
}