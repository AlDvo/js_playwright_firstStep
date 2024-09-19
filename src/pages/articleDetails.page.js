import { BasePage } from "./base.page.js";

export class ArticleDetailsPage extends BasePage {
    constructor(page) {
        super(page);

        this.titleArticle = page.getByRole('heading', { name: 'test19.09-' });

        this.commentField = page.getByPlaceholder('Write a comment...');

        this.postCommentButton = page.getByRole('button', { name: 'Post Comment' })
    }

    async fillComment(comment) {
        await this.commentField.click();
        await this.commentField.fill(comment);
    }

    async clickPostCommentButton(){
        await this.postCommentButton.click();
    }
}