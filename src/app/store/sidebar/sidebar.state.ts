import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { SetSelectedSidebarItem } from './sidebar.actions';
import { SidebarItem } from './sidebar-item.model';

interface SidebarStateModel {
    selected: string;
    title: string;
    items: { [key: string]: SidebarItem };
}

@State<SidebarStateModel>({
    name: 'sidebar',
    defaults: {
        selected: 'search',
        title: 'Book Search',
        items: {
            search: {
                link: 'search',
                icon: 'fas fa-search',
                label: 'Search'
            },
            wishlist: {
                link: 'wishlist',
                icon: 'fas fa-bookmark',
                label: 'Wishlist'
            },
        }
    }
})
@Injectable()
export class SidebarState {

    constructor() { }

    @Selector()
    static getSelectedSidebarItem(state: SidebarStateModel) {
        return state.selected;
    }

    @Selector()
    static getTitle(state: SidebarStateModel) {
        return state.title;
    }

    @Selector()
    static getItems(state: SidebarStateModel) {
        return state.items;
    }

    @Action(SetSelectedSidebarItem)
    SetSelectedSidebarItem({ patchState }: StateContext<SidebarStateModel>, action: SetSelectedSidebarItem) {
        patchState({ selected: action.item });
    }
}
