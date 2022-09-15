import { Users } from "@prisma/client";

export type TUser = Omit<Users, 'id'>