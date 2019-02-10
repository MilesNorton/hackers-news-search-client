import { FOUND_DATA } from "../actions/index";
import { ISearchResults } from "../lib/interface";

// Reduces action type to the state to return
interface IState {
  results: ISearchResults;
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
export default function(state = initialState, action) {
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
