import { prisma } from "../src/config/database";
import supertest from "supertest";
import app from "../src/index";

import * as userFactory from "./factories/userFactory";

describe("Testa SignUp", () => {

    it("Testa SignUp com body correto -> deve retornar 201 e o usuário criado.", async () => {
        
        const user = userFactory.correctUserFactory();
        
        const result = await supertest(app).post("/sign-up").send(user);

        expect(result.status).toBe(201);
        expect(result.body).toBeInstanceOf(Object);
    });

    it("Testa SignUp com body incompleto -> deve retornar 422", async () => {
        
        const user = userFactory.correctUserFactory();
        user.email = "";
        
        const result = await supertest(app).post("/sign-up").send(user);

        expect(result.status).toBe(422);
    });

    it("Testa SignUp com confirmPassword incorreta -> deve retornar 401", async () => {
        const user = userFactory.correctUserFactory();
        user.confirmPassword = user.confirmPassword + "a";
        
        const result = await supertest(app).post("/sign-up").send(user);

        expect(result.status).toBe(401);
    });

    it("Testa SignUp com email já em uso ->, deve retornar 409", async () => {
        const user = userFactory.correctUserFactory();
        await supertest(app).post("/sign-up").send(user);

        const result = await supertest(app).post("/sign-up").send(user);

        expect(result.status).toBe(409);
    });
});