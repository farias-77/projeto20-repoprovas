import * as teacherDisciplineRepositories from "../repositories/teacherDisciplineRepository";
import * as testRepositories from "../repositories/testRepository";
import { TeachersDisciplines } from "@prisma/client";
import { TTest } from "../types/testTypes";

export async function insertTest(test: TTest){
    return await testRepositories.insertTest(test);
}

export async function validateTeacherDisciplineId(teacherDisciplineId: number){
    const teacherDiscipline: (TeachersDisciplines | null) = await teacherDisciplineRepositories.findIfTeacherDisciplineIdIsValid(teacherDisciplineId);

    if(!teacherDiscipline){
        throw {type: "not found", message: "Invalid teacherDisciplineId."};
    }

    return;
}