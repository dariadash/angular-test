import { TemplateRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Resources, User } from './types';
import { AppService } from './app.service';

@Component({
    selector: 'my-app',
    templateUrl: './main.component.html',
    providers: [AppService]
})
export class MainComponent implements OnInit {

    @ViewChild('readOnlyTemplate', { static: false }) readOnlyTemplate: TemplateRef<any> | undefined;
    @ViewChild('editTemplate', { static: false }) editTemplate: TemplateRef<any> | undefined;

    editedUser: User | null = null;
    users: User[] = [];
    userItem: User = null;
    isNewRecord: boolean = false;
    statusMessage: string = "";
    resources: Resources[] = []

    constructor(private serv: AppService, private router: Router) {
        this.users = new Array<User>();
        this.resources = new Array<Resources>()
    }

    ngOnInit() {
        this.loadUsers();
        this.getResources()
    }

    goToUser(userItem: User) {
        this.router.navigate(
            ['/users'],
            {
                queryParams: {
                    'id': userItem.id,
                }
            }
        );
    }

    private getResources() {
        this.serv.getResources().subscribe((data: Resources[]) => {
            this.resources = data;
        });
    }

    private loadUsers() {
        this.serv.getUsers().subscribe((data: User[]) => {
            this.users = data;
        });
    }

    addUser() {
        this.editedUser = new User(0, "", "", "", "");
        this.users.push(this.editedUser);
        this.isNewRecord = true;
    }

    deleteUser(user: User) {
        this.serv.deleteUser(user.id).subscribe(data => {
            this.statusMessage = 'Данные успешно удалены',
                this.loadUsers();
        });
    }
}