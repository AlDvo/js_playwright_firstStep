import { test, expect } from '@playwright/test';
import { UserBuilder } from '../src/helper/index';
import { App } from '../src/pages/index';

const URL = "https://realworld.qa.guru/#/"
let user;
let app;


test.describe('Page Object ', () => {
    test.beforeEach(async ({ page }) => {

        user = new UserBuilder()
            .addName()
            .addEmail()
            .addPassword()
            .generate();

        app = new App(page);

        await app.mainPage.open(URL);
        await app.mainPage.goToRegister();

        await app.registerPage.fillFieldNewUserData(user.userName, user.userEmail, user.userPassword);
        await app.registerPage.clickSignUpButton();
        await app.mainPage.homeButton.click();
    });

    test('Выход пользователя из системы', async ({ page }) => {

        await app.mainPage.settingsButton.click();
        await app.mainPage.logoutButton.click();

        await expect(app.mainPage.signUpButton).toBeVisible();
    });

});

test('Проверка ошибки авторизации', async ({ page }) => {

    app = new App(page);

    await app.mainPage.open(URL);
    await app.mainPage.goToLogin();

    await expect(app.loginPage.headName).toHaveText("Sign in");

    await app.loginPage.fillFieldOnLoginPage("@notValid@notValid.net", 'NotValidPassword');
    await app.loginPage.loginButton.click();

    await expect(app.loginPage.errorMessage).toHaveText("Email not found sign in first");
});

test('Проверка перехода Sign in -> Sign up', async ({ page }) => {

    app = new App(page);

    await app.mainPage.open(URL);
    await app.mainPage.goToLogin();

    await expect(app.loginPage.headName).toHaveText("Sign in");

    await app.loginPage.needAccButton.click();
    await expect(app.registerPage.headName).toHaveText("Sign up");
});

test('Проверка перехода Sign up -> Sign in', async ({ page }) => {

    app = new App(page);

    await app.mainPage.open(URL);
    await app.mainPage.goToRegister();

    await expect(app.registerPage.headName).toHaveText("Sign up");

    await app.registerPage.signToYourAccButton.click();

    await expect(app.loginPage.headName).toHaveText("Sign in");
});

test('Проверка перехода на главную страницу', async ({ page }) => {

    app = new App(page);
    
    await app.mainPage.open(URL);
    await app.mainPage.goToRegister();
    await expect(app.registerPage.headName).toHaveText("Sign up");

    await app.mainPage.goToMainPage();
    await expect(app.mainPage.mainLogo).toHaveText("conduit");

    await app.mainPage.goToLogin();
    await expect(app.loginPage.headName).toHaveText("Sign in");

    await app.mainPage.goToMainPage();
    await expect(app.mainPage.mainLogo).toHaveText("conduit");
});