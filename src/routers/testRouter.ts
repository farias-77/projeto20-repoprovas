import { schemaValidation } from "../middlewares/schemaValidationMiddleware";
import tokenValidation from "../middlewares/tokenValidationMiddleware";
import { testSchema } from "../schemas/testSchemas";

import { Router } from "express";
import { insertTest, returnAllTests } from "../controllers/testsController";
const router = Router();

router.use(tokenValidation);
router.post("/test", schemaValidation(testSchema), insertTest);
router.get("/test", returnAllTests)

export default router;