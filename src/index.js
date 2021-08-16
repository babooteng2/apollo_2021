import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import client from "./apollo";
import { ApolloProvider } from "@apollo/client";

// yarn add styled-components react-router-dom apollo-boost @apollo/react-hooks graphql
// 변경 => yarn add styled-components react-router-dom @apollo/client graphql

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
