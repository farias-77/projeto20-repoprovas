import { insertTest, returnTestsByDiscipline, returnTestsByTeacher } from "../controllers/testsController";
import { schemaValidation } from "../middlewares/schemaValidationMiddleware";
import tokenValidation from "../middlewares/tokenValidationMiddleware";
import { testSchema } from "../schemas/testSchemas";

import { Router } from "express";
const router = Router();

router.use(tokenValidation);
router.post("/test", schemaValidation(testSchema), insertTest);
router.get("/testsByDiscipline", returnTestsByDiscipline);
router.get("/testsByTeacher", returnTestsByTeacher);

export default router;