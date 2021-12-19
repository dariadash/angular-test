import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Responce, User, ResponceResources } from './types';
import { map } from 'rxjs';

@Injectable()
export class AppService {

    private usersEndpoint = "https://reqres.in/api/users";
    private unknownEndpoint = "https://reqres.in/api/unknown";
    constructor(private http: HttpClient) { }

    getUsers() {
        return this.http.get<Responce>(this.usersEndpoint + '?page=2')
            .pipe(map((data) => data.data))
    }

    getResources() {
        return this.http.get<ResponceResources>(this.unknownEndpoint)
            .pipe(map(({ data }) => data))
    }

    getUserData(id: number) {
        return this.http.get<{ data: User }>(this.usersEndpoint + '/' + id);
    }

    createUser(user: User) {
        const headers = new HttpHeaders().set("Content-Type", "application/json");
        return this.http.post<User>(this.usersEndpoint, JSON.stringify(user), { headers });
    }
    updateUser(userId: string | number, user: User) {
        const headers = new HttpHeaders().set("Content-Type", "application/json");
        return this.http.put<User>(`${this.usersEndpoint}/${userId}`, JSON.stringify(user), { headers })
    }
    deleteUser(id: number) {
        return this.http.delete<User>(this.usersEndpoint + '/' + id);
    }
}