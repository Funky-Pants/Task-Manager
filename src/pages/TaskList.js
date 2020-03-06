import React, { Component } from "react";
import Task from "../components/Task";
import TasksMockAPI from "../api/TasksMockAPI";
import UsersMockAPI from "../api/UsersMockAPI";
import Loading from "../components/Loading";

export default class TaskList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
      ready: false,
      user: UsersMockAPI.getLoggedUser(),
      authorId: UsersMockAPI.getLoggedUserID()
    };
  }

  componentDidMount() {
    if (this.state.user.isAdmin) this.getAllTasks();
    else this.getByIdTasks();
  }

  getAllTasks() {
    TasksMockAPI.getAll().then(dbTasks => {
      this.setState({
        tasks: dbTasks,
        ready: true
      });
    });
  }

  getByIdTasks() {
    TasksMockAPI.getByAuthorId(this.state.authorId).then(dbTasks => {
      console.log(dbTasks);
      this.setState({
        tasks: dbTasks,
        ready: true
      });
    });
  }

  deleteTask(id) {
    this.setState({
      ready: false
    });

    TasksMockAPI.delete(id).then(() => {
      if (this.state.user.isAdmin) this.getAllTasks();
      else this.getByIdTasks();
    });
  }

  render() {
    if (this.state.ready) {
      return (
        <>       
          <h2 className="page-title">Tasks</h2>
          <hr/>
        <div className="row">
            {this.state.tasks.map(task => {
              return (
                <Task
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  description={task.description}
                  state={task.state}
                  rating={task.rating}
                  deleteTaskFunc={this.deleteTask.bind(this)}
                />
              );
            })}
        </div>
        </>
      );
    } else {
      return <Loading />;
    }
  }
}
