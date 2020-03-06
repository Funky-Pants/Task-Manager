import React, { Component } from "react";
import UsersMockAPI from "../api/UsersMockAPI";


export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      hasError: false,
      errorText: "",
      access: [false, false]
    };
  }

  onPropChange(event) {
    event.persist();

    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onSubmit(event) {
    event.preventDefault();

    if (!this.state.username || !this.state.password) {
      return;
    }

    const { username, password } = this.state;

    UsersMockAPI.login(username, password)
      .then(() => {
        this.setState({
          hasLogged: true
        });
        this.props.history.push("/tasks-list");
      })
      .catch(error => {
        this.setState({
          hasError: true,
          errorText: error
        });
      });
  }

  render() {
    return (
      <>
        <h2 className="page-title">Login</h2>
        <hr/>
        <form class="sign-element" onSubmit={this.onSubmit.bind(this)}>
          <div class="form-row my-3">
            <div class="col-md-12 form-group">
            <label for="validationDefaultUsername">Username</label>
            <div class="input-group">
              <div class="input-group-prepend">
              <span class="input-group-text"><i className="fa fa-user"></i></span>
              </div>
                <input type="text" className="form-control" name="username" placeholder="Username"  onChange={this.onPropChange.bind(this)} />
                </div>
                </div>
          </div>
          <div class="form-row my-3">
              <div className="col-md-12">
                <label for="validationDefaultPassword">Password</label>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroupPrepend2"><i className="fa fa-key"></i></span>
                  </div>
                  <input type="password" className="form-control" name="password" placeholder="Password" onChange={this.onPropChange.bind(this)} />
                </div>              
              </div>
            <div class="form-row my-3">
              <div className="col-md-12">
                  {this.state.hasError ? (
                  <p className="text-danger">{this.state.errorText}</p>
                  ) : (
                  ""
                  )}
              </div>
            </div>
          </div>
          <button type="submit" className="btn bg-task btn-custom my-3"><i className="fa fa-sign-in" aria-hidden="true"></i> Login</button>
        </form>
      </>
    );
  }
}
