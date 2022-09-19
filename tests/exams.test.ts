import { prisma } from "../src/config/database";
import supertest from "supertest";
import app from "../src/index";

import userFactory from "./factories/userFactory";
import examFactory from "./factories/examFactory";

describe("Testa criação de provas", () => {
    it("Testa criação de prova com body correto -> deve retornar 201 e a prova criada", async () => {
        const user = userFactory();
        const userCredentials = {email: user.email, password: user.password};
        const exam = examFactory();

        await supertest(app).post("/sign-up").send(user);
        const signInResult = await supertest(app).post("/sign-in").send(userCredentials);
        const token = signInResult.body.token;
        
        const result = await supertest(app).post("/test").set({ Authorization: `Bearer ${token}`}).send(exam);

        expect(result.status).toBe(201);
        expect(result.body).toBeInstanceOf(Object);
    });

    it("Testa criação de prova sem token -> deve retornar 401", async () => {
        const exam = examFactory();

        const result = await supertest(app).post("/test").send(exam);

        expect(result.status).toBe(401);
    });

    it("Testa criação de prova com categoryId inválido -> deve retornar 401", async () => {
        const user = userFactory();
        const userCredentials = {email: user.email, password: user.password};
       
        const exam = examFactory();
        const categories = await prisma.categories.findMany();
        exam.categoryId = categories[categories.length-1].id + 1; //maior que o último id

        await supertest(app).post("/sign-up").send(user);
        const signInResult = await supertest(app).post("/sign-in").send(userCredentials);
        const token = signInResult.body.token;
        
        const result = await supertest(app).post("/test").set({ Authorization: `Bearer ${token}`}).send(exam);

        expect(result.status).toBe(401);
    });

    it("Testa criação de prova com teacherDisciplineId inválido -> deve retornar 404", async () => {
        const user = userFactory();
        const userCredentials = {email: user.email, password: user.password};
       
        const exam = examFactory();
        const teacherDisciplines = await prisma.teachersDisciplines.findMany();
        exam.teacherDisciplineId = teacherDisciplines[teacherDisciplines.length-1].id + 1; //maior que o último id

        await supertest(app).post("/sign-up").send(user);
        const signInResult = await supertest(app).post("/sign-in").send(userCredentials);
        const token = signInResult.body.token;
        
        const result = await supertest(app).post("/test").set({ Authorization: `Bearer ${token}`}).send(exam);

        expect(result.status).toBe(404);
    });
});

describe("Testa get em provas por disciplina", () => {
    it("Testa com token válido", async () => {
        const user = userFactory();
        const userCredentials = {email: user.email, password: user.password};

        await supertest(app).post("/sign-up").send(user);
        const signInResult = await supertest(app).post("/sign-in").send(userCredentials);
        const token = signInResult.body.token;
        
        const result = await supertest(app).get("/testsByDiscipline").set({ Authorization: `Bearer ${token}`}).send();

        expect(result.status).toBe(200);
        expect(result.body).toBeInstanceOf(Array);
    });
});

describe("Testa get em provas por instrutor", () => {
    it("Testa com token válido", async () => {
        const user = userFactory();
        const userCredentials = {email: user.email, password: user.password};

        await supertest(app).post("/sign-up").send(user);
        const signInResult = await supertest(app).post("/sign-in").send(userCredentials);
        const token = signInResult.body.token;
        
        const result = await supertest(app).get("/testsByTeacher").set({ Authorization: `Bearer ${token}`}).send();

        expect(result.status).toBe(200);
        expect(result.body).toBeInstanceOf(Array);
    });
});

