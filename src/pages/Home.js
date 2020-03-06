import React, { Component } from "react";
import Hello from "../components/Hello";

import UsersMockAPI from "../api/UsersMockAPI";

export default class Home extends Component {
  getUserName() {
    let user = UsersMockAPI.getLoggedUser();

    if (user.id > 0) return user.username;
    else return "Stranger";
  }

  render() {
    return (
      <>
        <Hello name={this.getUserName()} />
        <h2 className="cover-heading pt-5">This is easy task manager made with ReactJs</h2>
        <h3 className="text-center pt-5">Enjoy</h3>
      </>
    );
  }
}
