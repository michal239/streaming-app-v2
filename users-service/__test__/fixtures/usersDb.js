class UsersDb {
  constructor(data) {
    this.users = data;
  }
  
  findOne(query) {
    const key = Object.keys(query)[0];
    const value = query[key];

    return this.users.find(user => user[key] === value);
  }
}

export default UsersDb;