import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { EditProvider } from "./store/edit-context";
import { DeleteProvider } from "./store/delete-context";

ReactDOM.render(
  <React.StrictMode>
    <EditProvider>
      <DeleteProvider>
        <App />
      </DeleteProvider>
    </EditProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
