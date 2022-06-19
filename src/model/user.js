import { v4 as uuidv4 } from "uuid";

export default class User {
  constructor({ id = uuidv4(), username, age, hobbies = [] }) {
    this.id = id;
    this.username = username;
    this.age = age;
    this.hobbies = hobbies;

    return { id, username, age, hobbies };
  }
}
