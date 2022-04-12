import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { getFirestoneApp } from "./components/Firebase/config";
getFirestoneApp();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename="/digiGames">
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
