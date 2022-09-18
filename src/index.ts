import express, { json } from "express";
import "express-async-errors";
import dotenv from "dotenv";
import cors from "cors";

import errorHandlingMiddleware from "./middlewares/errorHandlingMiddleware";
import router from "./routers/indexRouter";

const app = express();
dotenv.config();

app.use(cors());
app.use(json());

app.use(router);
app.use(errorHandlingMiddleware);

export default app;