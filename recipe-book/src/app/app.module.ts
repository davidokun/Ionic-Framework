import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import {EditRecipePageModule} from '../pages/edit-recipe/edit-recipe.module';
import {RecipePageModule} from '../pages/recipe/recipe.module';
import {RecipesPageModule} from '../pages/recipes/recipes.module';
import {ShoppingListPageModule} from '../pages/shopping-list/shopping-list.module';
import {TabsPageModule} from '../pages/tabs/tabs.module';
import {EditRecipePage} from '../pages/edit-recipe/edit-recipe';
import {RecipePage} from '../pages/recipe/recipe';
import {RecipesPage} from '../pages/recipes/recipes';
import {ShoppingListPage} from '../pages/shopping-list/shopping-list';
import {TabsPage} from '../pages/tabs/tabs';
import {ShoppingListService} from '../services/shopping-list.service';
import {RecipesService} from '../services/recipes.service';
import {SigninPage} from '../pages/signin/signin';
import {SignupPage} from '../pages/signup/signup';
import {SigninPageModule} from '../pages/signin/signin.module';
import {SignupPageModule} from '../pages/signup/signup.module';
import {AuthService} from '../services/auth.service';
import {SlOptionsPageModule} from '../pages/shopping-list/sl-options/sl-options.module';
import {SlOptionsPage} from '../pages/shopping-list/sl-options/sl-options';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    EditRecipePageModule,
    RecipePageModule,
    RecipesPageModule,
    ShoppingListPageModule,
    TabsPageModule,
    SigninPageModule,
    SignupPageModule,
    SlOptionsPageModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    EditRecipePage,
    RecipePage,
    RecipesPage,
    ShoppingListPage,
    TabsPage,
    SigninPage,
    SignupPage,
    SlOptionsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ShoppingListService,
    RecipesService,
    AuthService
  ]
})
export class AppModule {}
