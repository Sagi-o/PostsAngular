import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { LoadPosts } from 'src/app/store/posts/posts.actions';
import { PostsState } from 'src/app/store/posts/posts.state';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  @Select(PostsState.getPostsByUsers) usersPosts$: Observable<any[]>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(new LoadPosts());
  }
}
