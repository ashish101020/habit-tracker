import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { HabitProvider } from "./context/habitContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HabitProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </HabitProvider>,
);

