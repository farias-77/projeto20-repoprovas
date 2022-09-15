import { Router } from "express";
const router = Router();

import authRouter from "./authRouter";
import testsRouter from "./testRouter";

router.use(authRouter);
router.use(testsRouter);

export default router;