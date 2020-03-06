import React, { Component } from "react";
import UsersMockAPI from "../api/UsersMockAPI";

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      username: "",
      password: "",
      hasError: false,
      isAdmin: false
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

    UsersMockAPI.register(this.state)
      .then(() => {
        this.props.history.push("/login");
      })
      .catch(() => {
        this.setState({
          hasError: true
        });
      });
  }

  render() {
    return (
      <>
        <h2 className="page-title">Register</h2>
        <hr/>
        <form onSubmit={this.onSubmit.bind(this)}>
            <div class="form-row">
                <div class="col-md-12 my-3">
                <label for="validatioUsername">Username</label>
                <div class="input-group">
                    <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroupPrepend2"><i className="fa fa-user"></i></span>
                    </div>
                    <input type="text" class="form-control" id="validatioUsername" name="username" placeholder="Username" 
                    onChange={this.onPropChange.bind(this)} aria-describedby="inputGroupPrepend2" required/>
                </div>                
                {this.state.hasError ? (
                  <p className="text-danger">Username taken.</p>
                ) : (
                  ""
                )}
                </div>
            </div>
            <div class="form-row">
                <div class="col-md-12 my-3">
                <label for="validationPassword">Password</label>
                <div class="input-group">
                    <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroupPrepend2"><i className="fa fa-key"></i></span>
                    </div>
                    <input type="password" class="form-control" id="validationPassword" name="password" placeholder="Password" 
                    onChange={this.onPropChange.bind(this)} aria-describedby="inputGroupPrepend2" required/>
                </div>
                </div>
            </div>
            <button type="submit" className="btn bg-task btn-custom mt-4"><i className="fa fa-user-plus" aria-hidden="true"></i> Register</button>
        </form>
      </>
    );
  }
}
