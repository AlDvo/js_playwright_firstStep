import { faker } from '@faker-js/faker';

//класс билдер, для создания тестовых сущностей
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

    addNotValidPassword() {
        this.userNotValidPassword = faker.internet.password(3);
        return this;
    }

    addUrl() {
        this.userUrl = faker.internet.url();
        return this;
    }

    addBio(num = 20) {
        this.userBio = faker.word.words(num);
        return this;
    }

    generate() {
        const copied = structuredClone(
            {
                userName: this.userName,
                userEmail: this.userEmail,
                userPassword: this.userPassword,
                userNotValidPassword: this.userNotValidPassword,
                userUrl: this.userUrl,
                userBio: this.userBio,
            }

        );
        return copied;
    }
}