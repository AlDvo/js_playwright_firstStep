import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { BasePage, MainPage, LoginPage, RegisterPage } from '../src/pages/index';

const URL = "https://realworld.qa.guru/#/"
let user;

test.describe('Page Object ', () => {
    test.beforeEach(async ({ page }) => {

        user = {
            userName: faker.person.firstName(),
            userEmail: faker.internet.email(),
            userPassword: faker.internet.password()
        };
        
        const mainPage = new MainPage(page);
        const registerPage = new RegisterPage(page);

        await mainPage.open(URL);
        await mainPage.goToRegister();

        await registerPage.fillFieldNewUserData(user.userName, user.userEmail, user.userPassword);
        await registerPage.clickSignUpButton();
        await mainPage.homeButton.click();
    });

        test('Выход пользователя из системы', async ({ page }) => {
            const mainPage = new MainPage(page);
            const registerPage = new RegisterPage(page);

            await mainPage.settingsButton.click();
            await mainPage.logoutButton.click();

            await expect(mainPage.signUpButton).toBeVisible();
        });

});

test('Проверка ошибки авторизации', async ({ page }) => {
    const mainPage = new MainPage(page);
    const loginPage = new LoginPage(page);

    await mainPage.open(URL);
    await mainPage.goToLogin();

    await expect(loginPage.headName).toHaveText("Sign in");

    await loginPage.fillFieldOnLoginPage("@notValid@notValid.net", 'NotValidPassword');
    await loginPage.loginButton.click();

    await expect(loginPage.errorMessage).toHaveText("Email not found sign in first");
});

test('Проверка перехода Sign in -> Sign up', async ({ page }) => {
    const mainPage = new MainPage(page);
    const loginPage = new LoginPage(page);
    const registerPage = new RegisterPage(page);

    await mainPage.open(URL);
    await mainPage.goToLogin();

    await expect(loginPage.headName).toHaveText("Sign in");

    await loginPage.needAccButton.click();
    await expect(registerPage.headName).toHaveText("Sign up");
});

test('Проверка перехода Sign up -> Sign in', async ({ page }) => {
    const mainPage = new MainPage(page);
    const loginPage = new LoginPage(page);
    const registerPage = new RegisterPage(page);

    await mainPage.open(URL);
    await mainPage.goToRegister();

    await expect(registerPage.headName).toHaveText("Sign up");

    await registerPage.signToYourAccButton.click();

    await expect(loginPage.headName).toHaveText("Sign in");
});

test('Проверка перехода на главную страницу', async ({ page }) => {
    const mainPage = new MainPage(page);
    const loginPage = new LoginPage(page);
    const registerPage = new RegisterPage(page);

    await mainPage.open(URL);
    await mainPage.goToRegister();
    await expect(registerPage.headName).toHaveText("Sign up");

    await mainPage.goToMainPage();
    await expect(mainPage.mainLogo).toHaveText("conduit");

    await mainPage.goToLogin();
    await expect(loginPage.headName).toHaveText("Sign in");

    await mainPage.goToMainPage();
    await expect(mainPage.mainLogo).toHaveText("conduit");
});