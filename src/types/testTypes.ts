import { Tests } from "@prisma/client";

export type TTest = Omit<Tests, 'id'>

export interface ITestWithAllInfo {
    id: number,
    name: string,
    pdfUrl: string,
    categoryId: number,
    teacherDisciplineId: number,
    categories: {
      id: number,
      name: string
    },
    teacherDisciplines: {
      id: number,
      teacherId: number,
      disciplineId: number,
      teachers: {
        id: number,
        name: string
      },
      discipline: {
        id: number,
        name: string,
        termId: number
      }
    }
  }

export interface ITestAfterTreatment {
      id: number,
      name: string,
      pdfUrl: string,
      category: {
        id: number,
        name: string
      },
      teachers: {
        id: number,
        name: string
      },
      discipline: {
        id: number,
        name: string,
        termId: number
        }
  }

export interface ISanitizedTest {
    id: number,
    name: string,
    pdfUrl: string,
    category: string,
    teacher: string,
    discipline: string,
    termId: number
}