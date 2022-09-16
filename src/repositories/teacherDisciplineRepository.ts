import prisma from "../config/database";
import { Disciplines, Teachers, TeachersDisciplines } from "@prisma/client";

export async function findIfTeacherDisciplineIdIsValid(teacherDisciplineId: number): Promise<TeachersDisciplines | null>{
    return await prisma.teachersDisciplines.findFirst({
        where:{
            id: teacherDisciplineId
        }
    });
}

export async function getAllDisciplines(): Promise<Disciplines[]>{
    return await prisma.disciplines.findMany();
}

export async function getAllTeachers(): Promise<Teachers[]>{
    return await prisma.teachers.findMany();
}