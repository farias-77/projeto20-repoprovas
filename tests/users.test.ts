import supertest from "supertest";
import app from "../src/index";

import userFactory from "./factories/userFactory";

describe("Testa SignUp", () => {
    it("Testa SignUp com body correto -> deve retornar 201 e o usuário criado.", async () => {
        const user = userFactory();
        
        const result = await supertest(app).post("/sign-up").send(user);

        expect(result.status).toBe(201);
        expect(result.body).toBeInstanceOf(Object);
    });

    it("Testa SignUp com body incompleto -> deve retornar 422", async () => {
        const user = userFactory();
        user.email = "";
        
        const result = await supertest(app).post("/sign-up").send(user);

        expect(result.status).toBe(422);
    });

    it("Testa SignUp com confirmPassword incorreta -> deve retornar 401", async () => {
        const user = userFactory();
        user.confirmPassword = user.confirmPassword + "a";
        
        const result = await supertest(app).post("/sign-up").send(user);

        expect(result.status).toBe(401);
    });

    it("Testa SignUp com email já em uso ->, deve retornar 409", async () => {
        const user = userFactory();
        await supertest(app).post("/sign-up").send(user);

        const result = await supertest(app).post("/sign-up").send(user);

        expect(result.status).toBe(409);
    });
});

describe("Testa SignIn" ,() => {
    it("Testa SignIn com o body correto -> deve retornar 200 e o token dentro de um objeto", async () => {
        const user = userFactory();
        const email = user.email;
        const password = user.password;

        await supertest(app).post("/sign-up").send(user);

        const result = await supertest(app).post("/sign-in").send({email, password});

        expect(result.status).toBe(200);
        expect(result.body).toBeInstanceOf(Object);
    });

    it("Testa SignIn com a senha incorreta -> deve retornar 401", async () => {
        const user = userFactory();
        await supertest(app).post("/sign-up").send(user);

        const invalidCredentials = {email: user.email, password: user.password + "a"};
        const result = await supertest(app).post("/sign-in").send(invalidCredentials);

        expect(result.status).toBe(401);
    });
});