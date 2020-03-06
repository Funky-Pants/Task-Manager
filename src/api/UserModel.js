export default class UserModel {
    constructor(id, username, password, hasError, isAdmin) {
      this.id = id;
      this.username = username;
      this.password = password;
      this.hasError = hasError;
      this.isAdmin = isAdmin;
    }
  }
  