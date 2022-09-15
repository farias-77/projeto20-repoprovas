import { ITestWithAllInfo, TTest } from "../types/testTypes";
import { Tests } from "@prisma/client";
import prisma from "../config/database";

export async function insertTest(test: TTest){
    return await prisma.tests.create({
        data: test
    });
}

export async function getAllTests(): Promise< ITestWithAllInfo[] >{
    const testsWithAllInfo:ITestWithAllInfo[] = await prisma.tests.findMany({
        include:{
            categories: true,
            teacherDisciplines:{
                include:{
                    teachers: true,
                    discipline:true
                }
            }
        }
    });

    return testsWithAllInfo;
}
