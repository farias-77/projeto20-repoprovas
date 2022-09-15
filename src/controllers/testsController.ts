import { Request, Response } from "express";

import * as testServices from "../services/testServices";
import { TTest } from "../types/testTypes";

export async function insertTest(req: Request, res: Response){
    const test: TTest = req.body;

    await testServices.validateCategory(test.categoryId);
    await testServices.validateTeacherDisciplineId(test.teacherDisciplineId);
    await testServices.insertTest(test);

    res.status(201).send("Test created.");
}

export async function returnAllTests(req: Request, res: Response){
    const tests: any = await testServices.getAllTests();
    const testsGroupedByDiscipline: any = await testServices.divideByDiscipline(tests);
    const testsGroupedByTerm: any = 0 /// PAREI AQUI

    res.status(200).send(testsGroupedByDiscipline);
}