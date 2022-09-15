import * as teacherDisciplineRepositories from "../repositories/teacherDisciplineRepository";
import * as categoryRepositories from "../repositories/categoryRepository";
import { Categories, TeachersDisciplines, Tests } from "@prisma/client";
import { TTeacherDiscipline } from "../types/teacherDisciplineTypes";
import * as testRepositories from "../repositories/testRepository";
import { ITestAfterTreatment, ITestWithAllInfo, TTest } from "../types/testTypes";

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

export async function getAllTests(): Promise<Tests[]>{
    return await testRepositories.getAllTests();
}

export async function divideByDiscipline(tests: ITestWithAllInfo[]){
    const disciplines = await teacherDisciplineRepositories.getAllDisciplines();
    const numberOfDisciplines = disciplines.length;
    const testsPositionByDiscipline = [[]];
    
    for(let i = 1; i <= numberOfDisciplines; i++){
        const testsByDiscipline: any = [];
        
        tests.map((test: ITestWithAllInfo) => {
            const treatedTest = returnNewTestStructure(test);

            if(treatedTest.discipline.id === i){
                testsByDiscipline.push(treatedTest);
            }
        });

        testsPositionByDiscipline.push(testsByDiscipline);
    }
    
    return testsPositionByDiscipline;
}

function returnNewTestStructure(test: ITestWithAllInfo): ITestAfterTreatment{
    return {
        id: test.id,
        name: test.name,
        pdfUrl: test.pdfUrl,
        category: {
          id: test.categories.id,
          name: test.categories.name
        },
        teachers: {
          id: test.teacherDisciplines.teachers.id,
          name: test.teacherDisciplines.teachers.name
        },
        discipline: {
          id: test.teacherDisciplines.discipline.id,
          name: test.teacherDisciplines.discipline.name,
          termId: test.teacherDisciplines.discipline.termId
        }
    }
}