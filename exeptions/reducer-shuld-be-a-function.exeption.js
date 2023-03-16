export class reducerShuldBeAFunction extends Error {
    constructor() {
        super(`Reducer is not a function`);
        this.name = reducerShuldBeAFunction;
    };
};