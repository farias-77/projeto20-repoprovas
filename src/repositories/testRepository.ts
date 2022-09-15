import { TTest } from "../types/testTypes";
import prisma from "../config/database";

export async function insertTest(test: TTest){
    return await prisma.tests.create({
        data: test
    });
}
