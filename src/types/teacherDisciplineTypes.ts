import { TeachersDisciplines } from "@prisma/client";

export type TTeacherDiscipline = Omit<TeachersDisciplines, 'id'>