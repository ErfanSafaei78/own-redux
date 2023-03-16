export class actionIsNotAnObject extends Error {
    constructor() {
        super(`Action is not an Object`);
        this.name = actionIsNotAnObject;
    };
};