import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask";
import TaskList from "./pages/TaskList";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import UserList from "./pages/UserList";

import AccessMockAPI from "./api/AccessMockAPI";
import Access from "./components/Access";

export default class App extends Component {
  render() {
    AccessMockAPI.setCurrentPath();
    if (AccessMockAPI.giveAccess()) {
      return (
        <>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/add-task" component={AddTask} />
            <Route exact path="/edit-task/:id" component={EditTask} />
            <Route exact path="/tasks-list" component={TaskList} />
            <Route exact path="/add-user" component={AddUser} />
            <Route exact path="/edit-user/:id" component={EditUser} />
            <Route exact path="/users-list" component={UserList} />
          </Switch>
        </>
      );
    } else {
      return <Access />;
    }
  }
}
