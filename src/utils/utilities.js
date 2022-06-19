import User from "../model/userCommands.js";

export const isUserExist = (id) => {
  return !!User.getUserById(id);
};
