import { faker } from "@faker-js/faker";

export default function userFactory(){
    const password = faker.internet.password();
    
    const user = {
        email: faker.internet.email(),
        password,
        confirmPassword: password
    };

    return user;
}