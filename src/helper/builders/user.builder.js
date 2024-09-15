import { faker } from '@faker-js/faker';

//класс билдер, для созжания тестовых сущностей
//с разным набором параметров, набор параметров задается за счет функций

export class UserBuilder {
    addName() {
        this.userName = faker.person.firstName();
        return this;
    }

    addEmail() {
        this.userEmail = faker.internet.email();
        return this;
    }

    addPassword() {
        this.userPassword = faker.internet.password();
        return this;
    }

    generate() {
        const copied = structuredClone(
            {
                userName: this.userName,
                userEmail: this.userEmail,
                userPassword: this.userPassword
            }

        );
        return copied;
    }
}