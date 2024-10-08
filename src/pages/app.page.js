import { MainPage, LoginPage, RegisterPage, SettingsPage, CreateArticlePage, ArticleDetailsPage } from './index';

//класс фасад , для вынесения создания всех объектов в один класс
// чтобы после мы могли изспользовать обект одного класса , для обращения к объектам других классов

export class App{
    constructor(page) {
        this.page = page;
        this.mainPage = new MainPage(page),
        this.registerPage = new RegisterPage(page),
        this.loginPage = new LoginPage(page);
        this.createArticlePage = new CreateArticlePage(page);
        this.settingsPage = new SettingsPage(page);
        this.articleDetailsPage - new ArticleDetailsPage(page);
    }

}