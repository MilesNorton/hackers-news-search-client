import { FOUND_DATA } from "./index";
import { ISearchResults } from "../lib/interface";

export /**
 * Query the url passed in and return a payload with the results to the reducers
 *
 * @param {string} url
 */
const fetchResults = (url: string) => dispatch => {
  fetch(url)
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
