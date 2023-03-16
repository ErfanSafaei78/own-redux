//utilities
import { kindOf } from "./utilities/kind-of.util.js";
import { isFunction } from "./utilities/is-function.util.js";
//exeptions
import { reducerShuldBeAFunction } from "./exeptions/reducer-shuld-be-a-function.exeption.js";
import { dispatchingIsInProcess } from "./exeptions/dispatching-is-in-process.exeption.js";
import { actionIsNotAnObject } from "./exeptions/action-is-not-an-object.extention.js";
import { actionHasNoType } from "./exeptions/action-has-no-type.exeption.js";

/**
 * 
 * @param {function} reducer 
 * @param {object} initialState
 */
export function createStore(reducer, initialState) {
    if (!isFunction(reducer)) {
        throw new reducerShuldBeAFunction();
    }

    let state = initialState;
    let subscribers = [];
    let isDispatching = false;

    /**
     * 
     * @param {object} action object of action
     */
    function dispatch(action) {
        if (isDispatching) {
            throw new dispatchingIsInProcess();
        }
        isDispatching = true;

        if (!kindOf(action) === "object") {
            throw new actionIsNotAnObject();
        };
        if (!action.hasOwnProperty("type")) {
            throw new actionHasNoType();
        }


        try {
            state = reducer(state, action);
            broadcast();
        } finally {
            isDispatching = false;
        }

    };
    /**
     * 
     * @param {function} callbackFn function to be called when state changes
     * @returns 
     */
    function subscribe(callbackFn) {
        subscribers.push(callbackFn);
        return () => {
            const callbackFnIndex = subscribers.indexOf(callbackFn)
            if (callbackFnIndex >= 0) { //if index founded in subscribers
                subscribers.splice(callbackFnIndex, 1);
            }
        }
    };
    /**
     * 
     * @returns state of store
     */
    function getState() {
        return state;
    };

    /**
     * will call subscribers
     */
    function broadcast() {
        for (const subscribe of subscribers) {
            subscribe();
        }
    }

    dispatch ({
        type: "@@INIT",
    })

    return {
        dispatch,
        subscribe,
        getState,
    }
}