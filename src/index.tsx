import React from "react";
import "./index.css";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "Store/store.ts";
import "Public/fonts/Quicksand-Light.ttf";
import "Public/fonts/Quicksand-Regular.ttf";
import "Public/fonts/Montserrat-Light.ttf";
import "Public/fonts/Montserrat-Regular.ttf";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
