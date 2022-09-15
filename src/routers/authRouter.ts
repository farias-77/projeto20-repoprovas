import { schemaValidation } from "../middlewares/schemaValidationMiddleware";
import { signUpSchema, signInSchema } from "../schemas/authSchemas";

import { Router } from "express";
import { signUp } from "../controllers/authController";
const router = Router();

router.post("/sign-up", schemaValidation(signUpSchema), signUp );
router.post("/sign-in", schemaValidation(signInSchema), )


export default router;