import { BasePage } from "./base.page.js";

export class CreateArticlePage extends BasePage {
    constructor(page) {
        super(page);

        this.titleArticleField = page.getByPlaceholder('Article Title');
        this.descriptionArticleField = page.getByPlaceholder(`What's this article about?`);
        this.bodyArticleField = page.getByPlaceholder(`Write your article (in markdown)`);
        this.tagsArticleField = page.getByPlaceholder(`Enter tags`);

        this.submitButton = page.getByRole('button', { name: 'Publish Article' });    
    }

    async fillFieldsOnNewArticlePage(title = '', description = '', body = '', tags = '') {
        await this.titleArticleField.click();
        await this.titleArticleField.fill(title);
        await this.descriptionArticleField.click();
        await this.descriptionArticleField.fill(description);
        await this.bodyArticleField.click();
        await this.bodyArticleField.fill(body);
        await this.tagsArticleField.click();
        await this.tagsArticleField.fill(tags);
    }

    async clickSubmitButton(){
        await this.submitButton.click();
    }
}