//exeptions
import { reducerReturnsUndefined } from "./exeptions/reducer-returns-undefiend.exeption.js";

/**
 * assert the reducers
 * @param {string} reducerKey key of reducer in reducers object
 * @param {function} reducer reducer function
 * @returns 
 */
export function shapeAssertReducers(reducerKey,reducer) {
    const firstAction = { type: "@INIT", target: reducerKey };
    const firstState = reducer(undefined, firstAction); // test reducer has own initial state?
    if (typeof firstState === "undefined") {
        throw new reducerReturnsUndefined();
    }

    const randomActionType = Math.random().toString(16).slice(2);
    const secondAction = {type: randomActionType, target: reducerKey,};
    const secondState = reducer(undefined, secondAction); // test reducer has default return?
    if (typeof secondState === "undefined") {
        throw new reducerReturnsUndefined();
    }
    return true;
};