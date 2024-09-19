import { BasePage } from "./base.page.js";

export class SettingsPage extends BasePage {
    constructor(page) {
        super(page);

        this.titleSettings = page.getByRole('heading', { name: "Your Settings" });

        this.urlProfileField = page.getByPlaceholder(`URL of profile picture`);
        this.nameField = page.getByPlaceholder(`Your Name`);
        this.shortBioField = page.getByPlaceholder(`EShort bio about you`);
        this.emailField = page.getByPlaceholder(`Email`);
        this.passwordField = page.getByPlaceholder(`Password`);

        this.updateButton = page.getByRole('button', { name: 'Update Settings' });
    }

    async fillNotMandatoryFieldUserData(userUrl = '', userBio = '') {
        await this.nameField.click();
        await this.nameField.fill(userUrl);
        await this.emailField.click();
        await this.emailField.fill(userBio);
        await this.passwordField.click();
        await this.passwordField.fill(userPassword);
    }

    async clickUpdateSettingsButton() {
        await this.updateButton.click();
    }
}