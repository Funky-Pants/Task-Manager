import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";


class User extends Component {
  constructor(props) {
    super(props);
    this.isAdminRef = React.createRef();
  }

  deleteUser() {
    this.props.deleteUserFunc(this.props.id);
  }

  editUser() {
    this.props.history.push("/edit-user/" + this.props.id);
  }

  getIsAdminState() {
    if (this.props.isAdmin) return "true";
    else return "false";
  }

  render() {
    return (
      <>
      <tr>
        <td>{this.props.id}</td>
        <td>{this.props.username}</td>
        <td>{this.props.password}</td>
        <td>{this.getIsAdminState()}</td>
        <td><Link onClick={this.editUser.bind(this)} className="user-link"><i class="fa fa-edit"></i></Link></td>
        <td><Link onClick={this.deleteUser.bind(this)} className="user-link"><i class="fa fa-trash"></i></Link></td>
      </tr>
      </>
    );
  }
}

export default withRouter(User);

User.propTypes = {
  id: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  deleteUserFunc: PropTypes.func.isRequired
};
