import { FOUND_DATA } from "../actions/index";
import { ISearchResults } from "../lib/interface";
import { dispatchInterface } from "../actions/queryActions";

// Reduces action type to the state to return
export interface IState {
  results: ISearchResults | undefined;
}
const initialState: IState = {
  results: undefined
};

/**
 *
 *
 * @export
 * @param {*} [state=initialState]
 * @param {*} action
 * @returns
 */
export default function(state = initialState, action: dispatchInterface) {
  switch (action.type) {
    case FOUND_DATA:
      return {
        ...state,
        results: action.payload
      };
    default:
      return state;
  }
}
