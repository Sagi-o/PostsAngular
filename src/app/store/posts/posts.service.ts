import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PostsService {
    private readonly API = 'https://jsonplaceholder.typicode.com/posts';

    constructor(private http: HttpClient) {}

    loadPosts() {
        return this.http.get<any>(this.API);
    }
}
