export class reducerReturnsUndefined extends Error {
    constructor() {
        super(`Reducer returns undefined`);
        this.name = reducerReturnsUndefined;
    };
};