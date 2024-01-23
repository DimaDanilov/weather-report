import React from "react";
import "./App.css";
import { MainPage } from "@pages/MainPage";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <div className="App">
      <MainPage />
      <Analytics />
    </div>
  );
}

export default App;
