import { Component, OnInit } from '@angular/core';
import { TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription } from 'rxjs';
import { AppService } from './app.service';
import { User } from './types';

@Component({
    selector: 'user-app',
    templateUrl: './user.component.html',
    providers: [AppService]
})
export class UserComponent implements OnInit {

    @ViewChild('readOnlyTemplate', { static: false }) readOnlyTemplate: TemplateRef<any> | undefined;
    @ViewChild('editTemplate', { static: false }) editTemplate: TemplateRef<any> | undefined;

    editedUser: User | null = null;
    userId: number = null
    user: User = null;
    isNewRecord: boolean = false;
    statusMessage: string = "";

    private routeSubscription: Subscription;
    private querySubscription: Subscription;
    constructor(private serv: AppService, private route: ActivatedRoute, private router: Router) {
        this.querySubscription = route.queryParams.subscribe(
            (queryParam: any) => {
                this.userId = queryParam['id'];
            }
        );
    }

    ngOnInit() {
        this.loadUser();
    }

    private loadUser() {
        this.serv.getUserData(this.userId).subscribe(({ data }) => {
            this.user = data;
        });
    }

    editUser(user: User) {
        this.editedUser = new User(user.id, user.email, user.first_name, user.last_name, user.avatar);
    }

    loadTemplate(user: User) {
        if (this.editedUser && this.editedUser.id === user.id) {
            return this.editTemplate;
        } else {
            return this.readOnlyTemplate;
        }
    }

    saveUser() {
        this.serv.updateUser(this.userId, this.editedUser as User).subscribe(data => {
            this.loadUser();
            this.statusMessage = "Пользователь обновлён";
        });
        this.editedUser = null;
    }
    cancel() {
        this.editedUser = null;
    }

    deleteUser(user: User) {
        this.serv.deleteUser(user.id).subscribe(data => {
            this.router.navigate(
                ['/']
            );
            this.statusMessage = 'Данные успешно удалены';
        });
    }
}
