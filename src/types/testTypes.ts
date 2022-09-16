import { Tests } from "@prisma/client";

export type TTest = Omit<Tests, 'id'>

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

export interface ISanitizedTest {
    id: number,
    name: string,
    pdfUrl: string,
    teacher: string
}

export interface ITerm {
  term: number,
  disciplines: IDiscipline[]
}

export interface ISanitizedTerm {
  term: number,
  disciplines: ISanitizedDiscipline[]
} 

export interface IDiscipline {
  discipline: string,
  tests:{
    Projeto: ITestWithAllInfo[],
    Prática: ITestWithAllInfo[],
    Recuperação: ITestWithAllInfo[]
  }
}

export interface ISanitizedDiscipline {
  discipline: string,
  tests:{
    Projeto: ISanitizedTest[],
    Prática: ISanitizedTest[],
    Recuperação: ISanitizedTest[]
  }
}