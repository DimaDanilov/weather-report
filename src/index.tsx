import React from "react";
import "./index.css";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "@store/store";
import "@fonts/Quicksand-Light.ttf";
import "@fonts/Quicksand-Regular.ttf";
import "@fonts/Montserrat-Light.ttf";
import "@fonts/Montserrat-Regular.ttf";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
