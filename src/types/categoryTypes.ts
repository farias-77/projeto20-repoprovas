import { Categories } from "@prisma/client";

export type TCategory = Omit<Categories, 'id'>