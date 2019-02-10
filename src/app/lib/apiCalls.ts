/**
 * build a query string
 *TODO: split the searchURL to baseURL and searchQuery
 * @param {string} searchUrl - The url needed to search queries.
 * @param {[string, string][]} queries - an array of key and value queries
 * @param {*} queriesSeparator  - queries separator, generally = but could be different
 * @param {*} additionalQuerySeparator - concatenate extra queries, generally & but could be different
 * @returns
 */
export const buildQuery = (
  searchUrl: string,
  queries: [string, string][],
  queriesSeparator: string,
  additionalQuerySeparator: string
): string => {
  return queries
    .map(([key, value]: [string, string], index: number) => {
      return index > 0
        ? additionalQuerySeparator + key + queriesSeparator + value
        : key + queriesSeparator + value;
    })
    .reduce((previousString: string, currentString: string) => {
      return previousString + currentString;
    }, searchUrl);
};
