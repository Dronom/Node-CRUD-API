import User from "./user.js";

export default [
  new User({ id: "test", username: "Peotr", age: 21, hobbies: ["ping pong"] }),
  new User({ username: "Vasya", age: 22, hobbies: [] }),
];
