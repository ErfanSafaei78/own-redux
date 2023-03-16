export class dispatchingIsInProcess extends Error {
    constructor() {
        super(`Dispatching is in process.`);
        this.name = dispatchingIsInProcess;
    };
};