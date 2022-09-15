import { Tests } from "@prisma/client";

export type TTest = Omit<Tests, 'id'>