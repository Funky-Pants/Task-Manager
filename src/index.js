import React, { Component } from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";

import Header from "./components/Header";
import Main from "./App";
import UsersMockAPI from "./api/UsersMockAPI";
import TasksMockAPI from "./api/TasksMockAPI";
import Access from "./components/Access";
import AccessMockAPI from "./api/AccessMockAPI";

import './assets/index.scss';


export default class App extends Component {
  render() {
    UsersMockAPI.seedAdmin();
    TasksMockAPI.seed();
    AccessMockAPI.setUser();
    
    return (
      <>
        <Header />
        <div className="container my-5">
        {AccessMockAPI.giveAccess ? <Main /> : <Access />}
        </div>
      </>
    );
  }
}

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
