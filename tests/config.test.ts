import { prisma } from "../src/config/database";

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE tests;`;
    await prisma.$executeRaw`TRUNCATE TABLE users;`;
});
  
  afterAll(async () => {
      await prisma.$disconnect();
});

describe("Arquivo para configurar beforeEach e afterAll", () => {
    it("Arquivo .test precisa de uma suite :)", async () => {
        const soma = 1 + 2;

        expect(soma).toBe(3);
    })
});