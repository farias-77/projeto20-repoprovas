import { Router } from "express";
const router = Router();

import authRouter from "./authRouter";

router.use(authRouter);

export default router;