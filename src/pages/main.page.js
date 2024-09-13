import { BasePage } from "./base.page.js";

export class MainPage extends BasePage{
    constructor (page) {
        super(page);
        this.mainLogo = page.getByRole('heading', { name: 'conduit' });

        this.loginButton = page.getByRole('link', { name: 'Login' });
        this.homeButton = page.getByRole('link', { name: 'Home' });
        this.signUpButton = page.getByRole('link', { name: 'Sign up' });

        this.dropdownMenu = page.locator("nav-item dropdown");

        this.profileButton = page.getByRole('link', { name: 'Profile' });
        this.settingsButton = page.getByRole('link', { name: 'Settings' });
        this.logoutButton = page.getByRole('link', { name: 'Logout' });
    }

    async goToRegister () {
        await this.signUpButton.click();
    }

    async goToLogin () {
        await this.loginButton.click();
    }

    async goToMainPage () {
        await this.homeButton.click();
    }

}