import prisma from "../config/database";
import { Categories } from "@prisma/client";

export async function findById(categoryId: number): Promise<Categories | null>{
    return await prisma.categories.findFirst({
        where:{
            id: categoryId
        }
    });
}