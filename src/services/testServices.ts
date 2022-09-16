import * as teacherDisciplineRepositories from "../repositories/teacherDisciplineRepository";
import * as categoryRepositories from "../repositories/categoryRepository";
import * as testRepositories from "../repositories/testRepository";
import * as termRepositories from "../repositories/termRepository";

import { Categories, TeachersDisciplines, Tests, Disciplines } from "@prisma/client";
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

export async function divideByDiscipline(tests: ITestWithAllInfo[]): Promise<[ITestAfterTreatment[]]>{
    const disciplines = await teacherDisciplineRepositories.getAllDisciplines();
    const numberOfDisciplines = disciplines.length;
    const testsPositionByDiscipline: [ITestAfterTreatment[]] = [[]];
    
    for(let i = 1; i <= numberOfDisciplines; i++){
        const testsByDiscipline: any = [];
        
        tests.map((test: ITestWithAllInfo) => {
            const treatedTest: ITestAfterTreatment = returnNewTestStructure(test);

            if(treatedTest.discipline.id === i){
                testsByDiscipline.push(treatedTest);
            }
        });

        testsPositionByDiscipline.push(testsByDiscipline);
    }
    
    return testsPositionByDiscipline;
}

export async function divideByTerm(testsGroupedByDiscipline: [ITestAfterTreatment[]]){   
    type periodosKey = keyof typeof periodos;
    
    const disciplines: Disciplines[]  = await teacherDisciplineRepositories.getAllDisciplines();
    const terms = await termRepositories.getAllTerms(); 
    let periodos = {};
    
    //cria um array para cada período
    for(let i = 1; i <= terms.length; i++){
        periodos = {...periodos, [i]: []};
    }
                        //array com array de provas por posição
    for(let i = 1; i < testsGroupedByDiscipline.length; i++){
        const termIdOfDiscipline = disciplines[i-1].termId as periodosKey;
        const testsOfDiscipline: ITestAfterTreatment[] = testsGroupedByDiscipline[i];

        const periodosData: [ITestAfterTreatment[]] = periodos[termIdOfDiscipline];
        periodosData.push(testsOfDiscipline);
        
        periodos = { ...periodos, [termIdOfDiscipline]: periodosData};
    }

    return periodos;
}

export async function divideByCategory(testsGroupedByTerm: {}){
    const categories = await categoryRepositories.getAllCategories();
    const terms = await termRepositories.getAllTerms();

    let testsGroupedByCategory = {};

    for(let termId = 1; termId <= terms.length; termId++){
        type ObjectKey = keyof typeof testsGroupedByTerm;
        const termIdAsKey = termId as ObjectKey;
        const termDisciplinesArray: [ITestAfterTreatment[]] = testsGroupedByTerm[termIdAsKey];        
        
        let newTermFormat = [];
        const newTermDisciplinesFormat = [];         

        for(let j = 0; j < termDisciplinesArray.length; j++){
            const disciplineAsObject = returnDisciplineDividedByCategory(termDisciplinesArray[j], categories);
            newTermDisciplinesFormat.push(disciplineAsObject);
        }

        newTermFormat.push(newTermDisciplinesFormat);

        testsGroupedByCategory = {...testsGroupedByCategory, [termIdAsKey]: newTermFormat};
    }

    return testsGroupedByCategory;
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

function returnDisciplineDividedByCategory(tests: ITestAfterTreatment[], categories: Categories[]){
    let testsByCategory = {};
    type ObjectKey = keyof typeof testsByCategory;

    for(let i = 0; i < categories.length; i++){
        testsByCategory = { ...testsByCategory, [categories[i].name]: []};
    }

    for(let i = 0; i < tests.length; i++){
        const test: ITestAfterTreatment = tests[i];
        const testCategory = test.category.name as ObjectKey;

        const categoryData: ITestAfterTreatment[] = testsByCategory[testCategory];
        categoryData.push(test);
        
        testsByCategory = { ...testsByCategory, [testCategory]: categoryData};
    }
    
    return testsByCategory;
}