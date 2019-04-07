import * as React from "react";
import { shallow } from "enzyme";

import FailedResult from "../FailedResult";

it("renders the heading", () => {
  const result = shallow(FailedResult("Please search something.")).contains(
    "Please search something."
  );
  expect(result).toBeTruthy();
});
