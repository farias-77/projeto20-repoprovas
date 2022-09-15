import * as teacherDisciplineRepositories from "../repositories/teacherDisciplineRepository";
import * as categoryRepositories from "../repositories/categoryRepository";
import * as testRepositories from "../repositories/testRepository";
import { Categories, TeachersDisciplines } from "@prisma/client";
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

export async function validateCategory(categoryId: number){
    const category: (Categories | null) = await categoryRepositories.findById(categoryId);

    if(!category){
        throw{type: "unauthorized", message: "Invalid categoryId"};
    }

    return;
}