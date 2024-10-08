import { BasePage } from "./base.page.js";

export class LoginPage extends BasePage {
    constructor(page) {
        super(page);

        this.headName = page.getByRole('heading', { name: "Sign in" });

        this.emailField = page.getByPlaceholder('Email');
        this.passwordField = page.getByPlaceholder('Password');

        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.needAccButton = page.getByRole('link', { name: 'Need an account?' });
        
        this.errorMessage = page.getByText('Email not found sign in first');
    }

    async fillFieldOnLoginPage(userEmail = '', userPassword = '') {
        await this.emailField.click();
        await this.emailField.fill(userEmail);
        await this.passwordField.click();
        await this.passwordField.fill(userPassword);
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    async clickNeedAccButton() {
        await this.needAccButton.click();
    }
}