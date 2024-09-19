import { faker } from '@faker-js/faker';

//класс билдер, для созжания тестовых сущностей
//с разным набором параметров, набор параметров задается за счет функций

export class ArticleBuilder {
    addTitle(num = 1) {
        this.title = faker.word.words(num);
        return this;
    }

    addDescription(num = 5) {
        this.description = faker.word.words(num);
        return this;
    }

    addBody(num = 20) {
        this.body = faker.word.words(num);
        return this;
    }

    addTags(num = 1) {
        this.tags = faker.word.words(num);
        return this;
    }

    generate() {
        const copied = structuredClone(
            {
                title: this.title,
                description: this.description,
                body: this.body,
                tags: this.tags
            }

        );
        return copied;
    }
}