import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Todos from "./pages/todos";
import StoreProvider from "./store/store";

ReactDOM.render(
  <StoreProvider>
    <Todos />
  </StoreProvider>,
  document.getElementById("root"),
);
