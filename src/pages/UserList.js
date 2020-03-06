import React, { Component } from "react";
import User from "../components/User";
import UsersMockAPI from "../api/UsersMockAPI";
import TasksMockAPI from "../api/TasksMockAPI";
import Loading from "../components/Loading";

export default class UserList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      ready: false,
      currentID: UsersMockAPI.getLoggedUserID(),
      admin: UsersMockAPI.getIsAdmin()
    };
  }

  componentDidMount() {
    UsersMockAPI.getAll().then(dbUsers => {
      this.setState({
        users: dbUsers,
        ready: true
      });
    });
  }

  deleteUser(id) {
    this.setState({
      ready: false
    });

    UsersMockAPI.delete(id).then(() => {
      TasksMockAPI.deleteAllbyId(id).then(() => {
        UsersMockAPI.getAll().then(dbUsers => {
          this.setState({
            users: dbUsers,
            ready: true
          });
        });
      });
    });
  }

  render() {
    if (this.state.ready) {
      return (
          <>
          <h2 className="page-title">Users</h2>
          <hr/>
          <table class="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Password</th>
                <th>Admin</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
            {this.state.users.map(user => {
              return (
                <User
                  key={user.id}
                  id={user.id}
                  username={user.username}
                  password={user.password}
                  isAdmin={user.isAdmin}
                  deleteUserFunc={this.deleteUser.bind(this)}
                />
              );
            })}
            </tbody>
            </table>
          </>
      );
    } else {
      return <Loading />;
    }
  }
}
