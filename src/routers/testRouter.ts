import { schemaValidation } from "../middlewares/schemaValidationMiddleware";
import tokenValidation from "../middlewares/tokenValidationMiddleware";
import { testSchema } from "../schemas/testSchemas";

import { Router } from "express";
import { insertTest } from "../controllers/testsController";
const router = Router();

router.use(tokenValidation);
router.post("/test", schemaValidation(testSchema), insertTest);

export default router;