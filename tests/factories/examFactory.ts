import { faker } from "@faker-js/faker";

export default function examFactory(){
    const exam = {
        name: faker.lorem.words(3),
        pdfUrl: faker.internet.url(),
        categoryId: 1,
        teacherDisciplineId: 1
      };

    return exam;
}