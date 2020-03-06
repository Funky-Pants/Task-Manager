import React, { Component } from "react";
import { Link } from "react-router-dom";
import UsersMockAPI from "../api/UsersMockAPI";

export default class Header extends Component {
  logout() {
    UsersMockAPI.logout();
    this.setState({ logIn: false })
  }
  render() {
    let loggedUser = UsersMockAPI.getLoggedUser();
    if (loggedUser.id < 0 ) {
      return (
        <>
        <header className="bg-white">
          <div className="row"><div className="col-md-12 text-center mt-3"><h1><i className="fa fa-tasks text-task"></i> Personal task manager</h1></div></div>
        </header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light text-task">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
            <ul className="navbar-nav">
              <li className="nav-item px-3">
                <Link to="/"><i className="fa fa-home" aria-hidden="true"></i> Home</Link>
              </li>
              <li className="nav-item px-3">
                <Link to="/login"><i className="fa fa-sign-in" aria-hidden="true"></i> Login</Link>
              </li>            
              <li className="nav-item px-3">
                <Link to="/register"><i className="fa fa-user-plus" aria-hidden="true"></i> Register</Link>
              </li>
            </ul>
          </div>
        </nav>
        </>
      );
    } else {
      let isAdmin = UsersMockAPI.getIsAdmin();
      return (
        <>
        <header className="bg-white">
          <div className="row"><div className="col-md-12 text-center mt-3"><h1><i className="fa fa-tasks text-task"></i> Personal task manager</h1></div></div>
        </header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light text-task">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
            <ul className="navbar-nav">
              <li className="nav-item active px-3">
                <Link to="/"><i className="fa fa-home" aria-hidden="true"></i> Home</Link>
              </li>
              <li className="nav-item px-3">
                <Link to="/add-task"><i className="fa fa-plus"></i> Add Task</Link>
              </li>
              <li className="nav-item px-3">
                <Link to="/tasks-list"><i className="fa fa-clipboard"></i> Tasks</Link>
              </li>              
              {isAdmin ? (
                <>                
                <li className="nav-item px-3">
                  <Link to="/add-user"><i className="fa fa-user-plus"></i> Add User</Link>
                </li>                
                <li className="nav-item px-3">
                  <Link to="/users-list"><i className="fa fa-users"></i> Users</Link>
                </li>
                </>
                ) : (
                  ""
                )}
              <li className="nav-item px-3">
                <Link to="/" onClick={this.logout.bind(this)}><i className="fa fa-sign-out"></i>Logout</Link>
              </li>
            </ul>
          </div>
        </nav>
        </>
      );
    }
  }
}
