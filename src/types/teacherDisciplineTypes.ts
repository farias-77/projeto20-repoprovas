import { TeachersDisciplines } from "@prisma/client";

export type TTeacherDiscipline = Omit<TeachersDisciplines, 'id'>

export type TDiscipline = { "Projeto": [], "Prática": [], "Recuperação" : []}