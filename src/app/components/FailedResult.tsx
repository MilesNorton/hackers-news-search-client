import * as React from "react";
import { Container } from "semantic-ui-react";

const FailedResult = (errorString: string) => (
  <Container textAlign="center" className="result-container-no-results">
    {errorString}
  </Container>
);

export default FailedResult;
