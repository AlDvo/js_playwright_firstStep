import { BasePage } from "./base.page.js";

export class RegisterPage extends BasePage {
    constructor(page) {
        super(page);

        this.headName = page.getByRole('heading', { name: "Sign up" });

        this.emailField = page.getByPlaceholder('Email');
        this.nameField = page.getByPlaceholder('Your Name');
        this.passwordField = page.getByPlaceholder('Password');

        this.signUpButton = page.getByRole('button', { name: 'Sign up' });
        this.signToYourAccButton = page.getByRole('link', { name: 'Sign in to your account' });
        
        this.errorMessage = page.getByText('Email already exists.. try logging in');
    }

    async fillFieldNewUserData(userName = '', userEmail = '', userPassword = '') {
        await this.nameField.click();
        await this.nameField.fill(userName);
        await this.emailField.click();
        await this.emailField.fill(userEmail);
        await this.passwordField.click();
        await this.passwordField.fill(userPassword);
    }

    async clickSignUpButton() {
        await this.signUpButton.click();
    }

    async clickSignToYourAccButton() {
        await this.signToYourAccButton.click();
    }
}