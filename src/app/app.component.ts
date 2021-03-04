import { Component, OnInit } from '@angular/core';
import { Actions, ofActionSuccessful, Store } from '@ngxs/store';
import { interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PostComponent } from './modules/main/post/post.component';
import { ModalService } from './modules/shared/services/global/modal.service';
import { LoadPosts, ReadLastPost } from './store/posts/posts.actions';
import { PostsState } from './store/posts/posts.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'book-search';
  readQueue = this.store.select(PostsState.getReadQueue);

  constructor(private modalService: ModalService, private store: Store) { }

  ngOnInit(): void {
    const postsInterval = interval(1000 * 60);
    postsInterval.subscribe(_ => this.store.dispatch(new LoadPosts()));

    this.readQueue.subscribe(queue => {
      if (queue?.length) {
        this.modalService.init(PostComponent, { post: queue[0] }, {});
      }
    });
  }

  async removeModal() {
    await this.modalService.destroy();
    this.store.dispatch(new ReadLastPost());
  }
}
