
export default class TasksMockAPI {
  static generateId() {
    return Math.floor(Math.random() * (10001 - 1 + 1)) + 1;
  }

  static seed() {
    let tasks = JSON.parse(localStorage.getItem("tasks"));

    if (!tasks || tasks.length === 0) {
      let seedTasks = [];

      let jsonTasks = JSON.stringify(seedTasks);
      localStorage.setItem("tasks", jsonTasks);
    }
  }

  static getById(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        let tasks = localStorage.getItem("tasks");
        let jsonTasks = JSON.parse(tasks);

        let result = jsonTasks.find(n => n.id === id);

        resolve(result);
      }, 1000);
    });
  }

  static getAll() {
    return new Promise((resolve) => {
      setTimeout(() => {
        let tasks = localStorage.getItem("tasks");
        tasks = JSON.parse(tasks);

        if (!tasks || tasks.length === 0) {
          resolve([]);
        } else {
          resolve(tasks);
        }
      }, 1000);
    });
  }

  static getByAuthorId(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        let allTasks = JSON.parse(localStorage.getItem("tasks"));

        let result = allTasks.filter(n => n.authorId === id);

        resolve(result);
      }, 1000);
    });
  }

  static save(task) {
    return new Promise((resolve) => {
      setTimeout(() => {
        let allTasks = JSON.parse(localStorage.getItem("tasks"));
        if (task.id) {
          let index = allTasks.findIndex(n => n.id === task.id);
          allTasks[index] = task;
        } else {
          task.id = TasksMockAPI.generateId();
          allTasks.push(task);
        }

        console.log("Save Task: " + task.authorId);

        let jsonTasks = JSON.stringify(allTasks);
        localStorage.setItem("tasks", jsonTasks);

        resolve();
      }, 1000);
    });
  }

  static delete(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        let tasks = JSON.parse(localStorage.getItem("tasks"));
        let index = tasks.findIndex(n => n.id === id);
        tasks.splice(index, 1);

        console.log("test: " + index);

        let jsonTasks = JSON.stringify(tasks);
        localStorage.setItem("tasks", jsonTasks);

        resolve();
      });
    });
  }

  static deleteAllbyId(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        let tasks = JSON.parse(localStorage.getItem("tasks"));
        let remainingTasks = tasks.filter( task => task.authorId !== id)
        remainingTasks = JSON.stringify(remainingTasks);
        localStorage.setItem("tasks", remainingTasks);

        resolve();
      }, 1000);
    });
  }
}
