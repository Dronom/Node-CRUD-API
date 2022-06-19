import usersList from "./userStorage.js";
import User from "./user.js";

const users = usersList;

const getAllUsers = () => {
  return users;
};

const getUserById = (id) => {
  return users.find((user) => user.id === id);
};

const addUser = (user) => {
  const newUser = new User(user);
  users.push(newUser);
  return newUser;
};

const updateUser = ({ id, fields }) => {
  const userIndex = users.findIndex((currentUser) => currentUser.id === id);
  users[userIndex] = { ...users[userIndex], ...fields };

  return true;
};

const deleteUser = (deletedUser) => {
  return users.splice(users.findIndex((user) => user.id === deletedUser.id));
};

export default { getAllUsers, getUserById, addUser, updateUser, deleteUser };
