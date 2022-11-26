import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./app/store";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";

import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
const root =document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <SnackbarProvider
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        maxSnack={3}
        autoHideDuration={2000}
      >
        <App />
      </SnackbarProvider>
    </BrowserRouter>
  </Provider>,
  root
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
