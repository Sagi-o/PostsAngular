export class SetPosts {
    static type = '[Posts] Set Posts';
    constructor(public posts: any[]) { }
}

export class LoadPosts {
    static type = '[Posts] Load Posts';
}

export class ReadLastPost {
    static type = '[Posts] Read Last Post';
}
