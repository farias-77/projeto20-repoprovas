import { Request, Response } from "express";
import { TUser } from "../types/userTypes";

import * as authServices from "../services/authServices"

export async function signUp(req: Request, res: Response){
    const user: TUser = {email: req.body.email, password: req.body.password};
    const confirmPassword: string = req.body.confirmPassword;
    
    authServices.validateConfirmPassword(user.password, confirmPassword);
    await authServices.validateNewEmail(user.email);
    await authServices.insertUser(user);

    res.status(200).send("Usuário criado com sucesso.");
}

export async function signIn(req: Request, res: Response){
    
}