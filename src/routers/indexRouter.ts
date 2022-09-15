import { Router } from "express";
const router = Router();

import authRouter from "./authRouter";
import examsRouter from "./examsRouter";

router.use(authRouter);
router.use(examsRouter);

export default router;