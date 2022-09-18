import { prisma } from "../src/config/database";
import supertest from "supertest";
import app from "../src/index";

describe("Testa nada", () => {
    it("Testa nada", async () => {
        const soma = 1 + 2;

        expect(soma).toBe(3)
    })
});


