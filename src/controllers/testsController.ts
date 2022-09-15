import { Request, Response } from "express";

import * as testServices from "../services/testServices";
import { TTest } from "../types/testTypes";

export async function insertTest(req: Request, res: Response){
    const test: TTest = req.body;

    await testServices.validateTeacherDisciplineId(test.teacherDisciplineId);
    await testServices.insertTest(test);

    res.status(201).send("Test created.");
}