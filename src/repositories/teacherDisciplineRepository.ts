import prisma from "../config/database";
import { TeachersDisciplines } from "@prisma/client";

export async function findIfTeacherDisciplineIdIsValid(teacherDisciplineId: number): Promise<TeachersDisciplines | null>{
    return await prisma.teachersDisciplines.findFirst({
        where:{
            id: teacherDisciplineId
        }
    });
}

export async function getAllDisciplines(){
    return await prisma.disciplines.findMany();
}