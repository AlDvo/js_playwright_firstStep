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

    async checkLoginPage() {
        await this.emailField.click();
        await expect(this.headName).toBeVisible();
        await expect(this.headName).toHaveText("Sign in");
        await expect(this.emailField).toBeVisible();
        await expect(this.passwordField).toBeVisible();
        await expect(this.loginButton).toBeVisible();
        await expect(this.needAccButton).toBeVisible();
    }

    async fillFieldOnLoginPage(userEmail = '', userPassword = '') {
        await this.emailField.fill(userEmail);
        await this.passwordField.fill(userPassword);
    }

    async checkMistakeOnLoginPage() {
        await expect(this.errorMessage).toBeVisible();
        await expect(this.errorMessage).toHaveText("Email not found sign in first");
    }
}