import { test, expect } from '@playwright/test';
import { UserBuilder, ArticleBuilder } from '../src/helper/index';
import { App } from '../src/pages/index';

const URL = "https://realworld.qa.guru/#/"
let user;
let app;
let article;


test.describe('Page Object ', () => {
    test.beforeEach(async ({ page }) => {

        user = new UserBuilder()
            .addName()
            .addEmail()
            .addPassword()
            .addUrl()
            .addBio()
            .generate();

        app = new App(page);

        await app.mainPage.open(URL);
        await app.mainPage.goToRegister();

        await app.registerPage.fillFieldNewUserData(user.userName, user.userEmail, user.userPassword);
        await app.registerPage.clickSignUpButton();
        await app.mainPage.homeButton.click();
    });

    test('Проверка создания новой публикации', async ({ page }) => {
        
        article = new ArticleBuilder()
                .addTitle()
                .addDescription()
                .addBody()
                .addTags()
                .generate();

        await app.mainPage.goToNewArticlePage();
        await app.createArticlePage.fillFieldsOnNewArticlePage(article.title, article.description, article.body, article.tags);
        await app.createArticlePage.clickSubmitButton();

        await expect(page.getByRole('heading', { name: article.title })).toBeVisible();
        await app.mainPage.goToMainPage();
    });

    test('Проверка данных пользователя', async ({ page }) => {

        await app.mainPage.goToSettingsPage();

        await app.settinsgPage.nameField.click();
        await expect(app.settinsgPage.nameField).toHaveText(user.userName);
        await expect(app.settinsgPage.emailField).toHaveText(user.userEmail);

        await app.mainPage.goToMainPage();
    });

    test('Добавление данных на странице settings', async ({ page }) => {

        await app.mainPage.goToSettingsPage();
        await app.settinsgPage.fillNotMandatoryFieldUserData(user.userUrl, user.userBio);
        await app.settinsgPage.clickUpdateSettingsButton();

        await expect(app.settinsgPage.updateButton).toBeEmpty();
        await app.mainPage.goToMainPage();
    });

    test('Добавление комментария к новой публикации', async ({ page }) => {
        
        article = new ArticleBuilder()
                .addTitle()
                .addDescription()
                .addBody()
                .addTags()
                .generate();

        await app.mainPage.goToNewArticlePage();
        await app.createArticlePage.fillFieldsOnNewArticlePage(article.title, article.description, article.body, article.tags);
        await app.createArticlePage.clickSubmitButton();

        await expect(page.getByRole('heading', { name: article.title })).toBeVisible();

        await app.articleDetailsPage.fillComment(article.description);
        await expect(locator('div').filter({ hasText: article.description })).toBeVisible();
    });
});

test('Проверка ошибки авторизации', async ({ page }) => {
    
    app = new App(page);
    user = new UserBuilder()
            .addEmail()
            .addNotValidPassword()
            .generate();

    await app.mainPage.open(URL);
    await app.mainPage.goToRegister();
    await expect(app.registerPage.headName).toHaveText("Sign up");

    await app.loginPage.fillFieldOnLoginPage("@notValid@notValid.net", 'NotValidPassword');
    await app.loginPage.clickLoginButton();

    await expect(app.loginPage.errorMessage).toHaveText("Email not found sign in first");
});
