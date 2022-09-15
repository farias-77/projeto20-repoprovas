import * as userRepositories from "../repositories/userRepository";
import { TUser } from "../types/userTypes";
import { Users } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export function validateConfirmPassword(password: string, confirmPassword: string){
    if(password !== confirmPassword){
        throw{type: "unauthorized", message: "Password and confirmPassword must be equal!"};
    }

    return;
}

export async function validateNewEmail(email: string){
    const user: Users = await findByEmail(email);

    if(user){
        throw{type: "conflict", message: "Email already in use!"};
    }

    return;
}

export async function insertUser(user: TUser){
    const encryptedUser: TUser = {...user, password: await encryptsPassword(user.password)};
    
    return await userRepositories.insertUser(encryptedUser);
}

export async function validatePassword(userBody: TUser){
    const userDatabase = await findByEmail(userBody.email);
    
    if(!userDatabase || !bcrypt.compare(userBody.password, userDatabase.password)){
        throw{type: "unauthorized", message: "Invalid credentials."};
    }

    return;
}

export async function generateToken(email: string){
    const user: Users = await findByEmail(email);
    
    const secretKey: string = process.env.JWT_SECRET || "";
    const token = jwt.sign({ id: user.id }, secretKey);

    return token;
}

async function encryptsPassword(password: string): Promise<string>{
    const SALT: number = 10;
    const encryptedPassword: string = await bcrypt.hash(password, SALT);
    
    return encryptedPassword;
}

async function findByEmail(email: string): Promise<Users>{
    return await userRepositories.findByEmail(email);
}