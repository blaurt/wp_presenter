import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { getMountPointSelector } from "./adapter";

try {
  const mountPoint = getMountPointSelector();
  console.log("mountPoint", mountPoint);
  console.log("querySelector", document.querySelector(mountPoint));
  console.log(
    "querySelector .page-title",
    document.querySelector(".page-title")
  );
  setTimeout(() => {
    ReactDOM.render(<App />, document.querySelector(mountPoint));
  }, 0);
} catch (error) {
  console.log("error", error);
  console.error(error.message);
}
