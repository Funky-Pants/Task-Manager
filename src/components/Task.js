import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";

class Task extends Component {
  constructor(props) {
    super(props);
  }

  deleteTask() {
    this.props.deleteTaskFunc(this.props.id);
  }

  editTask() {
    this.props.history.push("/edit-task/" + this.props.id);
  }

  getTaskState(state) {
    if (state === "started") return "Started";
    else if (state === "inProcess") return "In Process";
    else if (state === "ended") return "Ended";
    else return "Started";
  }
  render() {
    return (
      <div className="col-md-4 mt-4">
        <div className="card">
          <div className="card-header row">
            <div className="col-md-6 text-left"> <Link onClick={this.editTask.bind(this)} className="card-link"><i class="fa fa-edit"></i></Link></div>
            <div className="col-md-6 text-right"> <Link onClick={this.deleteTask.bind(this)} className="card-link"><i class="fa fa-trash"></i></Link></div>
          </div>
          <div className="card-body">
            <h3 className="card-title">{this.props.title}</h3>
            <hr/>
            <p className="card-text">{this.props.description}</p>
          </div>
          <div className="card-footer row">
            <div className="col-md-6 text-left"> State: <span className="text-task">{this.getTaskState(this.props.state)}</span> </div>
            <div className="col-md-6 text-right"> Importance: <span className="text-task">{this.props.rating}</span> </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Task);

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  rating: PropTypes.string.isRequired,
  deleteTaskFunc: PropTypes.func.isRequired
};
