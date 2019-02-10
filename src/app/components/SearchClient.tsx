import * as React from "react";
import { ISearchResults, ISearchResult } from "../lib/interface";
import {
  Loader,
  Segment,
  Grid,
  Card,
  Icon,
  Input,
  Divider,
  Pagination,
  Container
} from "semantic-ui-react";
import { buildQuery } from "../lib/apiCalls";
import { fetchResults } from "../actions/queryActions";
import { connect } from "react-redux";

interface IProps {
  results: ISearchResults;
  activePage: number;
  queriedTotalPages: number;
  fetchResults: (url: string) => Promise<Response>;
}
interface IState {
  searchTerm: string;
  totalPages: number;
}
const MAXPERPAGE = 5; // can add a variable for changing the per page view value
class SearchClient extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      searchTerm: "",
      totalPages: 1
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    //convert prop to state
    if (nextProps.queriedTotalPages !== prevState.totalPages) {
      return { totalPages: nextProps.queriedTotalPages }; // get total page amounts
    } else return null;
  }

  fetchData = (searchTerm: string, maxPerPage: number, activePage: number) => {
    this.props.fetchResults(
      buildQuery(
        "http://hn.algolia.com/api/v1/search?",
        [
          ["query", searchTerm],
          ["hitsPerPage", maxPerPage.toString()],
          ["page", activePage.toString()]
        ],
        "=",
        "&"
      )
    );
  };

  handlePageChange = (element, data) => {
    this.fetchData(this.state.searchTerm, MAXPERPAGE, data.activePage - 1); // remember to decrement the active page by 1 for the query
  };
  onChange = element => {
    this.setState({ searchTerm: element.target.value, totalPages: 1 }); // reset pages total pages on a new query

    this.fetchData(
      this.state.searchTerm,
      MAXPERPAGE,
      0 // on every new query start from page 1
    );
  };

  render() {
    const { searchTerm, totalPages } = this.state;
    const { results, activePage } = this.props;

    const queriedResults =
      searchTerm !== "" && results ? (
        results.hits.map((hit: ISearchResult, id: number) => (
          <Card id={id} loading fluid className="result-container">
            <Card.Content>
              <Card.Header loading>
                <a href={hit.url}>{hit.title}</a>
              </Card.Header>
              <Card.Meta>
                {new Date(hit.created_at_i).toLocaleDateString("en-au")}
              </Card.Meta>
              <Card.Description>Author: {hit.author}</Card.Description>
              <Card.Description>{hit.url}</Card.Description>
              <Card.Content extra>
                <a href={hit.url}>Comments({hit.num_comments || "0"})</a>
              </Card.Content>
            </Card.Content>
          </Card>
        ))
      ) : (
        <Container textAlign="center" className="result-container-no-results">
          Please search something.
        </Container>
      );
    const pagination = (
      <Pagination
        ellipsisItem={null}
        firstItem={null}
        lastItem={null}
        siblingRange={1}
        boundaryRange={0}
        activePage={activePage}
        totalPages={totalPages}
        onPageChange={this.handlePageChange}
      />
    );
    return (
      <div className="search-client-outer-container">
        <Grid textAlign="center" className="search-client-outer-grid">
          <Grid.Column className="search-client-inner-grid">
            <Divider />
            <Input
              fluid
              onChange={this.onChange}
              icon={<Icon name="search" inverted circular link />}
              placeholder="Search..."
            />
            <Divider />

            <Segment.Group id="results-container">
              {queriedResults}
            </Segment.Group>
            <Divider />
            <Container textAlign="center">{pagination}</Container>
            <Divider />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state.query.results
    ? {
        //results found
        results: state.query.results,
        activePage: state.query.results.page + 1,
        queriedTotalPages: state.query.results.nbPages - 1 // account for index starting at 0
      }
    : {
        //no results
        results: undefined,
        activePage: 1,
        queriedTotalPages: 1
      };
};
// connect the store
export default connect(
  mapStateToProps,
  { fetchResults: fetchResults }
)(SearchClient);
