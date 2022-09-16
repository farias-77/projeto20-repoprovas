import { Request, Response } from "express";

import * as testServices from "../services/testServices";
import { ITestWithAllInfo, TTest, ITerm, ISanitizedTerm, ITestsByTeacher} from "../types/testTypes";

export async function insertTest(req: Request, res: Response){
    const test: TTest = req.body;

    await testServices.validateCategory(test.categoryId);
    await testServices.validateTeacherDisciplineId(test.teacherDisciplineId);
    const createdTest = await testServices.insertTest(test);

    res.status(201).send({test: createdTest});
}

export async function returnTestsByDiscipline(req: Request, res: Response){
    const tests: ITestWithAllInfo[] = await testServices.getAllTests();
    const groupedTests: ITerm[] = await testServices.groupTests(tests);
    const sanitizedGroupedTests: ISanitizedTerm[] = testServices.sanitizeGroupedTests(groupedTests);

    res.status(200).send(sanitizedGroupedTests);
}

export async function returnTestsByTeacher(req: Request, res: Response){
    const tests: ITestWithAllInfo[] = await testServices.getAllTests();
    const testsByTeacher: ITestsByTeacher[] = await testServices.groupTestsByTeacher(tests);

    res.status(200).send(testsByTeacher);
}