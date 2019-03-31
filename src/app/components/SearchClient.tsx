import * as React from "react";
import { ISearchResults, ISearchResult } from "../lib/interface";
import {
  Segment,
  Grid,
  Icon,
  Input,
  Divider,
  Container,
  PaginationProps
} from "semantic-ui-react";
import { fetchData } from "../lib/apiCalls";
import { fetchResults, dispatchInterface } from "../actions/queryActions";
import { connect } from "react-redux";
import SearchResult from "./SearchResult";
import FailedResult from "./FailedResult";
import { useState, useEffect } from "react";
import Pagination from "./Pagination";
import { IState } from "../reducers/queryReducer";
import { Dispatch } from "redux";
const MAXPERPAGE = 5; // can add a variable for changing the per page view value
const QUERY_URL = "http://hn.algolia.com/api/v1/search?";
interface IProps {
  results: ISearchResults | undefined;
  activePage: number;
  queriedTotalPages: number;
  fetchedResults: (url: string) => Promise<dispatchInterface>;
}

interface IQueryState {
  query: IState;
}

function SearchClient(props: IProps): JSX.Element {
  const {
    searchTerm,
    totalPages,
    currentPage,
    handlePageChange,
    handleSearchChange
  } = useStateChange(props);

  return (
    <div className="search-client-outer-container">
      <Grid textAlign="center" className="search-client-outer-grid">
        <Grid.Column className="search-client-inner-grid">
          <Divider />
          <Input
            fluid
            onChange={handleSearchChange}
            icon={<Icon name="search" inverted circular link />}
            placeholder="Search..."
          />
          <Divider />
          <Segment.Group id="results-container">
            {queriedResults(searchTerm, SearchResult, {
              results: props.results
            })}
          </Segment.Group>
          <Divider />
          <Container textAlign="center">
            {Pagination(currentPage, totalPages, handlePageChange)}
          </Container>
          <Divider />
        </Grid.Column>
      </Grid>
    </div>
  );
}
function useStateChange(props: IProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (
    e: React.MouseEvent<HTMLAnchorElement>,
    data: PaginationProps
  ): void => {
    setCurrentPage(Number(data.activePage)); //reset current page on each search
    fetchData(
      QUERY_URL,
      MAXPERPAGE,
      searchTerm,
      currentPage,
      props.fetchedResults
    );
    //   (searchTerm, currentPage, props.fetchedResults); // remember to decrement the active page by 1 for the query
  };

  const handleSearchChange = (e: any) => {
    setSearchTerm(e.target.value); //update search term text as the user is typing
    setCurrentPage(1); //reset current page on each search
    fetchData(
      QUERY_URL,
      MAXPERPAGE,
      searchTerm,
      currentPage,
      props.fetchedResults
    );
  };

  useEffect(() => {
    setTotalPages(props.queriedTotalPages);
    return () => setTotalPages(1);
  }, [props]);

  return {
    searchTerm,
    totalPages,
    currentPage,
    handlePageChange,
    handleSearchChange
  };
}

const queriedResults = (
  searchTerm: string,
  SearchResult: (hit: ISearchResult, id: number) => JSX.Element,
  propsOnlyResults: Pick<IProps, "results">
): JSX.Element | JSX.Element[] => {
  if (searchTerm === "") return <>{FailedResult("Please search something.")}</>;
  if (!propsOnlyResults.results)
    return <>{FailedResult("Please search something.")}</>; // return if undefined
  const theResults: ISearchResults = propsOnlyResults.results as ISearchResults;

  return (
    <>
      {theResults.hits && theResults.hits.length > 0
        ? theResults.hits.map(SearchResult)
        : FailedResult("No Results. Please try again.")}
    </>
  );
};

const mapStateToProps = (
  state: IQueryState
): Pick<IProps, "results" | "activePage" | "queriedTotalPages"> => {
  return state.query.results
    ? {
        results: state.query.results,
        activePage: state.query.results.page + 1,
        queriedTotalPages: state.query.results.nbPages - 1 // account for index starting at 0
      }
    : {
        results: undefined,
        activePage: 1,
        queriedTotalPages: 1
      };
};

const mapDispatchToProps = (
  dispatch: Dispatch<dispatchInterface>
): Pick<IProps, "fetchedResults"> => {
  return {
    fetchedResults: (url: string) => fetchResults(url)(dispatch)
  };
};

// connect the store
export default connect<
  Pick<IProps, "results" | "activePage" | "queriedTotalPages">,
  Pick<IProps, "fetchedResults">,
  any,
  any
>(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {}
)(SearchClient);
