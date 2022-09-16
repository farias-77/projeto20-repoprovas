import * as teacherDisciplineRepositories from "../repositories/teacherDisciplineRepository";
import * as categoryRepositories from "../repositories/categoryRepository";
import * as testRepositories from "../repositories/testRepository";
import * as termRepositories from "../repositories/termRepository";

import { Categories, TeachersDisciplines, Tests, Disciplines, Terms, Teachers } from "@prisma/client";
import { ITestWithAllInfo, TTest, ISanitizedTest, IDiscipline, ITerm, ISanitizedTerm, ISanitizedDiscipline, ITestsByTeacher } from "../types/testTypes";


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

export async function getAllTests(): Promise<ITestWithAllInfo[]>{
    return await testRepositories.getAllTests();
}

export async function groupTests(tests: ITestWithAllInfo[]): Promise<ITerm[]>{
    const terms: Terms[] = await termRepositories.getAllTerms();
    const disciplines: Disciplines[] = await teacherDisciplineRepositories.getAllDisciplines();

    let groupedTests: ITerm[] = [];

    terms.forEach((term: Terms) => {
        const termNumber: number = term.number;
        const termDisciplines: IDiscipline[] = populateWithDisciplines(term, disciplines, tests);

        const termObject: ITerm = {term: termNumber, disciplines: termDisciplines};

        groupedTests.push(termObject);
    });

    groupedTests = distributeTests(tests, groupedTests);

    return groupedTests;
}

export function sanitizeGroupedTests(groupedTests: ITerm[]): ISanitizedTerm[]{
    const sanitizedTests: ISanitizedTerm[] = [];

    for(let i = 0; i < groupedTests.length; i++){
        const term: ITerm = groupedTests[i];
        const disciplines: IDiscipline[] = term.disciplines;

        let sanitizedTerm: ISanitizedTerm = {term: term.term, disciplines: returnSanitizedDisciplines(disciplines)};
        sanitizedTests.push(sanitizedTerm);
    }

    return sanitizedTests;
}

export async function groupTestsByTeacher(tests: ITestWithAllInfo[]){
    const sanitizedTests: ISanitizedTest[] = tests.map((test: ITestWithAllInfo) => {return returnSanitizedTest(test)});
    const teachers: Teachers[] = await teacherDisciplineRepositories.getAllTeachers();
    
    let testsByTeacher: ITestsByTeacher[] = [];
    teachers.forEach((teacher: Teachers) => {
        const testByTeacherStructure: ITestsByTeacher = {
             teacher: teacher.name,
             tests: {
                 Projeto: [],
                 Prática: [],
                 Recuperação: []
             }
        }

        testsByTeacher.push(testByTeacherStructure);
    });
    
    testsByTeacher = distributeTestsByTeacher(sanitizedTests, testsByTeacher);
    
    return testsByTeacher;
}

function populateWithDisciplines(term: Terms, disciplines: Disciplines[], tests: Tests[]): IDiscipline[]{
    const disciplineArray: IDiscipline[] = [];

    disciplines.forEach((discipline: Disciplines) => {
        if(discipline.termId === term.id){
            const disciplineObject = returnDisciplineObject(discipline);
            disciplineArray.push(disciplineObject);
        }
    });

    return disciplineArray;
}

function returnDisciplineObject(discipline: Disciplines): IDiscipline{
    const disciplineObject: IDiscipline = {
        discipline: discipline.name,
        tests: {
            Projeto: [],
            Prática: [],
            Recuperação: []
        }
    } 

    return disciplineObject;
}

function distributeTests(tests: ITestWithAllInfo[], groupedTests: ITerm[]): ITerm[]{
    
    tests.forEach((test: ITestWithAllInfo) => {
        groupedTests = placeTest(test, groupedTests);
    })   
    
    return groupedTests;
}

function distributeTestsByTeacher(tests: ISanitizedTest[], testsByTeacher: ITestsByTeacher[]): ITestsByTeacher[]{
    for(let i = 0; i < tests.length; i++){
        const test: ISanitizedTest = tests[i];
        const teacher = test.teacher; 
        
        for(let j = 0; j < testsByTeacher.length; j++){
            let teacherAtIndex: ITestsByTeacher = testsByTeacher[j];
            if(teacher === teacherAtIndex.teacher){
                teacherAtIndex = placeTestByTeacher(test, teacherAtIndex);
                testsByTeacher[j] = teacherAtIndex;
            }
        }
    }    
    
    return testsByTeacher;
}

function placeTest(test: ITestWithAllInfo, groupedTests: ITerm[]): ITerm[]{    
    const termId: number = test.teacherDisciplines.discipline.termId;
    const term: ITerm = groupedTests[termId - 1];

    const testCategory: string = test.categories.name;
    const testDiscipline: string = test.teacherDisciplines.discipline.name;

    const termDisciplines: IDiscipline[] = term.disciplines;
    for(let i = 0; i < termDisciplines.length; i++){
        const discipline: IDiscipline = termDisciplines[i];

        if(discipline.discipline === testDiscipline){
            type ObjectKey = keyof typeof discipline.tests;
            const testCategoryAsKey = testCategory as ObjectKey; 

            discipline.tests[testCategoryAsKey].push(test);
        }
    }

    return groupedTests;
}

function placeTestByTeacher(test: ISanitizedTest, testsByTeacher: ITestsByTeacher): ITestsByTeacher{
    const teacherTests = testsByTeacher.tests;
    type ObjectKey = keyof typeof teacherTests;
    
    const testCategory = test.category as ObjectKey;
    teacherTests[testCategory].push(test);

    return testsByTeacher;
}

function returnSanitizedTest(test: ITestWithAllInfo): ISanitizedTest{
    const sanitizedTest: ISanitizedTest = {
        id: test.id,
        name: test.name,
        pdfUrl: test.pdfUrl,
        category: test.categories.name,
        teacher: test.teacherDisciplines.teachers.name
    }

    return sanitizedTest;
} 

function returnSanitizedDisciplines(disciplines: IDiscipline[]): ISanitizedDiscipline[]{
    const sanitizedDisciplines: ISanitizedDiscipline[] = [];

    for(let i = 0; i < disciplines.length; i++){
        const discipline: IDiscipline = disciplines[i];
        const sanitizedDiscipline: ISanitizedDiscipline = returnSanitizedDiscipline(discipline);
        sanitizedDisciplines.push(sanitizedDiscipline);
    }

    return sanitizedDisciplines;
}

function returnSanitizedDiscipline(discipline: IDiscipline): ISanitizedDiscipline{
    const tests = discipline.tests;
    const disciplineName: string = discipline.discipline;
    type ObjectKey = keyof typeof tests;
    
    const projeto = "Projeto" as ObjectKey;
    const pratica = "Prática" as ObjectKey;
    const recuperacao = "Recuperação" as ObjectKey;
    
    const sanitizedProjects: ISanitizedTest[] = tests[projeto].map((test: ITestWithAllInfo) => {return returnSanitizedTest(test)});
    const sanitizedPractics: ISanitizedTest[] = tests[pratica].map((test: ITestWithAllInfo) => {return returnSanitizedTest(test)});
    const sanitizedRec: ISanitizedTest[] = tests[recuperacao].map((test: ITestWithAllInfo) => {return returnSanitizedTest(test)});

    const sanitizedDiscipline: ISanitizedDiscipline = {
        discipline: disciplineName,
        tests:{
            Projeto: sanitizedProjects,
            Prática: sanitizedPractics,
            Recuperação: sanitizedRec
        }
    }

    return sanitizedDiscipline;
}