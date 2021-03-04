import { Injectable, NgZone } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import {
    SetUser, ClearUser
} from './user.actions';

interface UserStateModel {
    username: string;
}

@State<UserStateModel>({
    name: 'user',
    defaults: { username: null }
})
@Injectable()
export class UserState {

    constructor() { }

    @Selector()
    static getUser(state: UserStateModel) {
        return state.username;
    }

    @Action(SetUser)
    setUser({ patchState }: StateContext<UserStateModel>, action: SetUser) {
        patchState({ username: action.username });
    }

    @Action(ClearUser)
    clearUser({ patchState }: StateContext<UserStateModel>, action: ClearUser) {
        patchState(null);
    }
}
