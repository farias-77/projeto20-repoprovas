import { Request, Response } from "express";
import { TUser } from "../types/userTypes";

import * as authServices from "../services/authServices"

export async function signUp(req: Request, res: Response){
    const user: TUser = {email: req.body.email, password: req.body.password};
    const confirmPassword: string = req.body.confirmPassword;
    
    authServices.validateConfirmPassword(user.password, confirmPassword);
    await authServices.validateNewEmail(user.email);
    await authServices.insertUser(user);

    res.status(201).send("User created.");
}

export async function signIn(req: Request, res: Response){
    const user: TUser = req.body;

    await authServices.validatePassword(user);
    const token = await authServices.generateToken(user.email);

    res.status(200).send({token});
}