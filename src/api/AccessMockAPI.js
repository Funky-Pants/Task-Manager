import UsersMockAPI from "../api/UsersMockAPI";
import ActiveUserModel from "./ActiveUserModel";

export default class AccessMockAPI {
  static user = new ActiveUserModel();
  static userState = false;
  static adminState = false;
  static access = false;

  static setUser() {
    this.user = UsersMockAPI.getLoggedUser();
  }

  static giveAccess() {
    if (this.user != null) {
      console.log("user: " + this.user.id + " / " + this.userState);
      console.log("admin: " + this.user.isAdmin + " / " + this.adminState);
    }

    console.log("User: " + this.user);
    console.log(
      "User state: " + this.userState + " / Admin State: " + this.adminState
    );

    if (
      this.user.id < 0 &&
      this.adminState === false &&
      this.userState === false
    ) {
      return true;
    } else if (this.user.id > 0) {
      if (this.user.isAdmin === this.adminState) {
        return true;
      } else if (this.user.isAdmin === true && this.adminState === false) {
        return true;
      } else {
        return false;
      }
    } else if (this.adminState === false && this.userState === false) {
      return true;
    } else {
      return false;
    }
  }

  static setAccessConditions(user, admin) {
    this.userState = user;
    this.adminState = admin;

    console.log("user: " + user);
    console.log("admin: " + admin);
  }

  static setCurrentPath() {
    var url = window.location.href;

    //Gets the last url segment
    var urlsplit = url.split("/").slice(-1)[0];

    //If the last url is an ID - get the previous section
    //witch is the needed section
    if (urlsplit > 0) urlsplit = url.split("/").splice(-2)[0];

    console.log("Full path: " + url);
    console.log("Current path: " + urlsplit);

    this.pathList(urlsplit);
  }

  static getIsLogged() {
    if (this.user.id > 0) return true;
    else return false;
  }

  static getIsAdmin() {
    return this.user.isAdmin;
  }

  static getAccess() {
    return this.access;
  }

  static pathList(path) {
    var user = false;
    var admin = false;

    switch (path) {
      case null:
        user = false;
        admin = false;
        break;
      case "":
        user = false;
        admin = false;
        break;
      case "home":
        user = false;
        admin = false;
        break;
      case "login":
        user = false;
        admin = false;
        break;
      case "register":
        user = false;
        admin = false;
        break;
      case "edit-task":
        user = true;
        admin = false;
        break;
      case "add-task":
        user = true;
        admin = false;
        break;
      case "tasks-list":
        user = true;
        admin = false;
        break;
      case "add-user":
        user = true;
        admin = true;
        break;
      case "edit-user":
        user = true;
        admin = true;
        break;
      case "users-list":
        user = true;
        admin = true;
        break;
      default:
        user = true;
        admin = true;
    }

    this.userState = user;
    this.adminState = admin;
  }
}
