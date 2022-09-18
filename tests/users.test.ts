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


});