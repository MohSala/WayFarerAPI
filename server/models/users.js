class User {
  constructor(email, first_name, last_name, password, is_admin) {
    this.id = Number();
    this.email = email;
    this.first_name = first_name;
    this.last_name = last_name;
    this.password = password;
    this.is_admin = false;
  }
}


export default User;