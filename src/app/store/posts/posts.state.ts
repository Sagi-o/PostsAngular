import { State, Store, Selector, Action, StateContext } from '@ngxs/store';
import { Injectable, NgZone } from '@angular/core';
import { PostsService } from './posts.service';
import { tap, catchError } from 'rxjs/operators';
import { LoadPosts, ReadLastPost, SetPosts } from './posts.actions';
import { of } from 'rxjs';

interface PostsStateModel {
    isLoading: boolean;
    posts: {[timstamp: number]: any[]};
    readQueue: any[];
}

@State<PostsStateModel>({
    name: 'posts',
    defaults: {
        isLoading: false,
        posts: {},
        readQueue: []
    }
})
@Injectable()
export class PostsState {
    constructor(private postsService: PostsService) { }

    @Selector()
    static getIsLoading(state: PostsStateModel) {
        return state.isLoading;
    }

    @Selector()
    static getReadQueue(state: PostsStateModel) {
        return state.readQueue;
    }

    @Selector()
    static getPostsByUsers(state: PostsStateModel) {
        const users = {};
        for (const [timestamp, posts] of Object.entries(state.posts)) {
            for (const post of posts) {
                if (users[post.userId]) {
                    users[post.userId].push(post);
                } else {
                    users[post.userId] = [post];
                }
            }
        }
        return users;
    }

    @Action(LoadPosts)
    loadPosts({ patchState, dispatch, getState }: StateContext<PostsStateModel>, action: LoadPosts) {
        patchState({ isLoading: true });
        return this.postsService.loadPosts().pipe(
            tap(res => {
                dispatch(new SetPosts(res));
                patchState({ isLoading: false });
            }),
            catchError(error => {
                return of(error);
            })
        );
    }

    @Action(SetPosts)
    setPosts({ patchState, getState }: StateContext<PostsStateModel>, action: SetPosts) {
        const timestamp = new Date().getTime();
        // tslint:disable-next-line:max-line-length
        patchState({ isLoading: false, posts: { ...getState().posts, [timestamp]: action.posts }, readQueue: [...getState().readQueue, ...action.posts] });
    }

    @Action(ReadLastPost)
    readLastPost({ patchState, getState }: StateContext<PostsStateModel>, action: ReadLastPost) {
        const { readQueue } = getState();
        const cloned = JSON.parse(JSON.stringify(readQueue));
        cloned.shift();
        patchState({ readQueue: cloned });
    }
}
