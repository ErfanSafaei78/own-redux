//exeptions
import { reducerShuldBeAFunction } from "./exeptions/reducer-shuld-be-a-function.exeption";
//shape assert reducers
import { shapeAssertReducers } from "./shape-assert-reducers";
//utils
import { isFunction } from "./utilities/is-function.util"

/**
 * 
 * @param {{function}} reducers object of reducers
 * @returns reducer function
 */
export function combineReducers(reducers) {
    const finalReducers = {};

    for (const reducerKey in reducers) {
        const reducer = reducers[reducerKey];
        if (!isFunction(reducer)) {
            throw new reducerShuldBeAFunction();
        };
        if (shapeAssertReducers(reducerKey, reducer)) {
            finalReducers[reducerKey] = reducer;
        }
    }

    /**
     * @param {object} state state of store
     * @param {object} action action object
     * @returns {state}
     */
    return (state = {}, action) => {
        let hasChanged = false;
        const nextState = state;
        const isINIT = action.type === "@@INIT";
        
        if(action.target === "undefiend" && !isINIT) {
            throw new Error (`action must have a target.`);
        }
        if(!finalReducers.hasOwnProperty(action.target) && !isINIT) {
            throw new Error (`reducer ${action.target} not found.`)
        }
        if (isINIT || action.type === "*"){ //if dispatch is initial dispatch or action must call all reducers
            for (const reducerKey in finalReducers) {
                const reducer = finalReducers[reducerKey];
                const reducerState = state[reducerKey];
                const newReducerState = reducer(reducerState, action);
                nextState[reducerKey] = newReducerState;
                hasChanged = newReducerState !== reducerState;
            }
        }
        else { //will call only target reducer
            const reducerKey = action.target;
            const reducer = finalReducers[reducerKey];
            const reducerState = state[reducerKey];
            delete action.target;
            const newReducerState = reducer(reducerState, action);
            nextState[reducerKey] = newReducerState;
            hasChanged = newReducerState !== reducerState;
        }
        return hasChanged ? nextState : state;
    }
}