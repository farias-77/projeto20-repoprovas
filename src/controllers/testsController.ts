import { Request, Response } from "express";

import * as testServices from "../services/testServices";
import { ITestAfterTreatment, TTest } from "../types/testTypes";

export async function insertTest(req: Request, res: Response){
    const test: TTest = req.body;

    await testServices.validateCategory(test.categoryId);
    await testServices.validateTeacherDisciplineId(test.teacherDisciplineId);
    await testServices.insertTest(test);

    res.status(201).send("Test created.");
}

export async function returnAllTests(req: Request, res: Response){
    const tests: any = await testServices.getAllTests();
    const testsGroupedByDiscipline: [ITestAfterTreatment[]] = await testServices.divideByDiscipline(tests);
    const testsGroupedByTerm: any = await testServices.divideByTerm(testsGroupedByDiscipline);
    const testsGroupedByCategory: any = await testServices.divideByCategory(testsGroupedByTerm);
    const sanitizedData: any = await testServices.sanitizeData(testsGroupedByCategory);

    res.status(200).send(sanitizedData);
}