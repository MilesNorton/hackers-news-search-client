import { FOUND_DATA } from "./index";
import { ISearchResults } from "../lib/interface";
import { Dispatch } from "redux";
export interface dispatchInterface {
  type: string;
  payload: ISearchResults | undefined;
}
/**
 * Query the url passed in and return a payload with the results to the reducers
 *
 * @param {string} url
 */
export const fetchResults = (url: string) => (
  dispatch: Dispatch<dispatchInterface>
): Promise<dispatchInterface> => {
  return fetch(url)
    .then(response => response.json())
    .then((results: ISearchResults) => {
      return dispatch({
        type: FOUND_DATA,
        payload: results
      });
    })
    .catch(err => {
      return dispatch({
        type: FOUND_DATA,
        payload: undefined
      });
    });
};
