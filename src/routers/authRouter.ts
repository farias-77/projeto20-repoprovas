import { schemaValidation } from "../middlewares/schemaValidationMiddleware";
import { signUpSchema, signInSchema } from "../schemas/authSchemas";
import { signIn, signUp } from "../controllers/authController";

import { Router } from "express";
const router = Router();

router.post("/sign-up", schemaValidation(signUpSchema), signUp );
router.post("/sign-in", schemaValidation(signInSchema), signIn);

export default router;