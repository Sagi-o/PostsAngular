export class SetUser {
    static type = '[User] Set User';
    constructor(public username: string) { }
}

export class ClearUser {
    static type = '[User] Clear User';
}
