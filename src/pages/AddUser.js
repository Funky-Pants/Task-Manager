import React, { Component } from "react";
import UserModel from "../api/UserModel";
import UsersMockAPI from "../api/UsersMockAPI";
import Loading from "../components/Loading";

export default class AddUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: new UserModel(0, "", "", false, false),
      ready: true,
      admin: UsersMockAPI.getIsAdmin()
    };
  }

  componentDidMount() {
    let id = this.props.match.params.id;

    if (id) {
      this.setState({
        ready: false
      });

      UsersMockAPI.getById(id).then(dbUser => {
        this.setState({
          user: dbUser,
          ready: true
        });
      });
    }
  }

  //I can have a problem here
  onPropChange(event) {
    event.persist();
    this.setState({
      user: { ...this.state.user, [event.target.name]: event.target.value }
    });
  }

  onCheckChange(e) {
    let user = this.state.user;
    console.log("Element " + e.target.checked);
    user.isAdmin = e.target.checked;
    this.setState({ user });
  }

  onSave(event) {
    event.preventDefault();
    if (this.state.user.username === "" || this.state.user.password === "") {
      return;
    }
    this.setState({
      ready: false
    });
    UsersMockAPI.save(this.state.user).then(() => {
      this.setState({
        ready: true
      });

      this.props.history.push("/users-list");
    });
  }

  render() {
    if (!this.state.ready) {
      return <Loading />;
    }

    return (
      <>
      <h2 className="page-title">Add User</h2>
      <hr/>
      <form class="sign-element" onSubmit={this.onSave.bind(this)}>
        <div class="form-row my-3">
          <div class="col-md-12 form-group">
            <label>Username</label>
            <div class="input-group">
              <div class="input-group-prepend">
              <span class="input-group-text"><i className="fa fa-user"></i></span>
              </div>
              <input type="text" class="form-control" name="username" placeholder="Username" value={this.state.user.username} onChange={this.onPropChange.bind(this)}/>
            </div>
          </div>
        </div>
        <div class="form-row my-3">
          <div class="col-md-12 form-group">
            <label>Password</label>
            <div class="input-group">
              <div class="input-group-prepend">
              <span class="input-group-text"><i className="fa fa-key"></i></span>
              </div>
              <input type="password" class="form-control" name="password" placeholder="Password" value={this.state.user.password} onChange={this.onPropChange.bind(this)}/>
            </div>
          </div>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="" id="isAdminCheck" defaultChecked={this.state.user.isAdmin} onChange={e => this.onCheckChange(e)}/>
          <label class="form-check-label" for="isAdminCheck">Admin</label>
        </div>
        <button className="btn bg-task btn-custom my-3" type="submit"><i className="fa fa-save" aria-hidden="true"></i> Save</button>
      </form>
      </>
    );
  }
}
