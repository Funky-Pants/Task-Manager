import UserModel from "./UserModel";
import ActiveUserModel from "./ActiveUserModel";

export default class UsersMockAPI {
  static generateId() {
    return Math.floor(Math.random() * (10001 - 1 + 1)) + 1;
  }

  static getLoggedUser() {
    let user = localStorage.getItem("logged-user");
    user = JSON.parse(user);
    if (user === null) return new ActiveUserModel(-1, "", false);
    else return user;
  }

  static getLoggedUserID() {
    let user = localStorage.getItem("logged-user");
    user = JSON.parse(user);
    if (user == null) return -1;
    else return user.id;
  }

  static getIsAdmin() {
    let user = localStorage.getItem("logged-user");
    user = JSON.parse(user);
    if (user == null) return false;
    else return user.isAdmin;
  }

  static seedAdmin() {
    let admin = new UserModel(1, "admin", "admin", false, true);

    let users = JSON.parse(localStorage.getItem("users"));

    if (!users) {
      users = [];
    }

    let doesExist = users.find(u => u.username === "admin" && u.isAdmin);

    if (!doesExist) {
      users.push(admin);

      let usersJSON = JSON.stringify(users);
      localStorage.setItem("users", usersJSON);
    }
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let users = localStorage.getItem("users");
        users = JSON.parse(users);

        console.log(users);

        if (!users || users.length === 0) {
          resolve([]);
        } else {
          resolve(users);
        }
      }, 1000);
    });
  }

  static getById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let users = localStorage.getItem("users");
        let jsonUsers = JSON.parse(users);

        let result = jsonUsers.find(n => n.id === id);
        console.log("result: " + result);
        resolve(result);
      }, 1000);
    });
  }

  static save(user) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let allUsers = JSON.parse(localStorage.getItem("users"));
        if (user.id) {
          let index = allUsers.findIndex(n => n.id === user.id);
          allUsers[index] = user;
        } else {
          user.id = UsersMockAPI.generateId();
          allUsers.push(user);
        }

        let jsonUsers = JSON.stringify(allUsers);
        localStorage.setItem("users", jsonUsers);

        resolve();
      }, 1000);
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let users = JSON.parse(localStorage.getItem("users"));
        let index = users.findIndex(n => n.id === id);
        users.splice(index, 1);

        let jsonUsers = JSON.stringify(users);
        localStorage.setItem("users", jsonUsers);

        resolve();
      }, 1000);
    });
  }

  static logout() {
    let user = JSON.parse(localStorage.getItem("logged-user"));

    if (user) {
      localStorage.setItem("logged-user", null);
    }
  }

  static login(username, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let users = JSON.parse(localStorage.getItem("users"));

        let currentUser = users.find(
          u => u.username === username && u.password === password
        );

        if (currentUser) {
          let user = new ActiveUserModel(
            currentUser.id,
            currentUser.username,
            currentUser.isAdmin
          );
          let userJSON = JSON.stringify(user);
          localStorage.setItem("logged-user", userJSON);
          resolve(currentUser);
        } else {
          reject("Wrong username or password.");
        }
      }, 1500);
    });
  }

  static register(user) {
    return new Promise((resolve, reject) => {
      let users = JSON.parse(localStorage.getItem("users"));

      if (!users) {
        users = [];
      }

      let doesExist = users.find(u => u.username === user.username);

      if (!doesExist) {
        user.id = UsersMockAPI.generateId();

        users.push(user);
        let usersJSON = JSON.stringify(users);
        localStorage.setItem("users", usersJSON);

        resolve();
      } else {
        reject();
      }
    });
  }
}
    