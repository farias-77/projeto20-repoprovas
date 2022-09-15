import * as userRepositories from "../repositories/userRepository";
import { TUser } from "../types/userTypes";
import { Users } from "@prisma/client";
import bcrypt from "bcrypt";

export function validateConfirmPassword(password: string, confirmPassword: string){
    if(password !== confirmPassword){
        throw{type: "unauthorized", message: "Password and confirmPassword must be equal!"};
    }

    return;
}

export async function validateNewEmail(email: string){
    const user: Users = await userRepositories.findByEmail(email);

    if(user){
        throw{type: "conflict", message: "Email already in use!"};
    }

    return;
}

export async function insertUser(user: TUser){
    const encryptedUser: TUser = {...user, password: encryptsPassword(user.password)};
    
    return await userRepositories.insertUser(encryptedUser);
}


function encryptsPassword(password: string){
    const SALT: number = 10;
    
    return bcrypt.hashSync(password, SALT);
}