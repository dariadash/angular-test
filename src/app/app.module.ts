import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './main.component';
import { AppComponent } from './app.component';
import { UserComponent } from './user.component';

// определение маршрутов
const appRoutes: Routes = [
    { path: '', component: MainComponent },
    { path: 'users', component: UserComponent }
];

@NgModule({
    imports: [BrowserModule, RouterModule.forRoot(appRoutes), FormsModule, HttpClientModule,],
    declarations: [AppComponent, MainComponent, UserComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }