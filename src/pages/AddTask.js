import React, { Component } from "react";
import TaskModel from "../api/TaskModel";
import TasksMockAPI from "../api/TasksMockAPI";
import UsersMockAPI from "../api/UsersMockAPI";
import Loading from "../components/Loading";


export default class AddTask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      task: new TaskModel(null, "", "", "", 1, UsersMockAPI.getLoggedUserID()),
      ready: true,
      user: UsersMockAPI.getLoggedUser()
    };
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    if (id) {
      this.setState({
        ready: false
      });

      TasksMockAPI.getById(id).then(dbTask => {
        this.setState({
          task: dbTask,
          ready: true
        });
      });
    }
  }

  onPropChange(event) {
    event.persist();
    this.setState({
      task: { ...this.state.task, [event.target.name]: event.target.value }
    });
  }

  onSave(event) {
    event.preventDefault();
    if (this.state.task.title === "" || this.state.task.description === "") {
      return;
    }
    this.setState({
      ready: false
    });
    TasksMockAPI.save(this.state.task).then(() => {
      this.setState({
        ready: true
      });

      console.log("Task: " + this.state.task.title);

      this.props.history.push("/tasks-list");
    });
  }

  render() {
    if (!this.state.ready) {
      return <Loading />;
    }

    //console.log(this.state.task.title);

    return (
      <>
      <h2 className="page-title">Add Task</h2>
      <hr/>
      <form class="sign-element" onSubmit={this.onSave.bind(this)}>
        <div class="form-row my-3">
          <div class="col-md-12 form-group">
            <label>Title</label>
            <div class="input-group">
              <div class="input-group-prepend">
              <span class="input-group-text"><i className="fa fa-pencil"></i></span>
              </div>
              <input className="form-control" name="title" placeholder="Title" value={this.state.task.title} onChange={this.onPropChange.bind(this)}/>
            </div>
          </div>
        </div>
        <div class="form-row my-3">
          <div class="col-md-12 form-group">
            <label>Description</label>
            <div class="input-group">
              <div class="input-group-prepend">
              <span class="input-group-text"><i className="fa fa-pencil"></i></span>
              </div>
              <input className="form-control" name="description" placeholder="Description" value={this.state.task.description} onChange={this.onPropChange.bind(this)}/>
            </div>
          </div>
        </div>
        <div class="form-row my-3">
          <div className="col-md-12">
            <label>State</label>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text"><i className="fa fa-pencil"></i></span>
              </div>
              <select className="form-control" name="state" value={this.state.task.state} onChange={this.onPropChange.bind(this)}>
                <option value="started">Started</option>
                <option value="inProcess">In Process</option>
                <option value="ended">Ended</option>
              </select>
            </div>
          </div>
        </div>
        <div class="form-row my-3">
          <div className="col-md-12">
            <label>Importance</label>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text"><i className="fa fa-pencil"></i></span>
              </div>
              <select className="form-control" name="rating" value={this.state.task.rating} onChange={this.onPropChange.bind(this)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
          </div>
        </div>
        <button className="btn bg-task btn-custom my-3" type="submit"><i className="fa fa-save" aria-hidden="true"></i> Save</button>
      </form>
      </>
    );
  }
}
