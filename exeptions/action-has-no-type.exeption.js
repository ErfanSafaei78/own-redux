export class actionHasNoType extends Error {
    constructor() {
        super(`Action has no type property.`);
        this.name = actionHasNoType;
    };
};