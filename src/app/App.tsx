import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import SearchClient from "./components/SearchClient";
import store from "./redux/store";
import "./assets/main.css";
declare let module: any;

ReactDOM.render(
  <Provider store={store}>
    <SearchClient />
  </Provider>,
  document.getElementById("root")
);

if (module.hot) {
  module.hot.accept();
}
