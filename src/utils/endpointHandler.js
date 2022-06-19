import { validate as uuidValidate } from "uuid";
import { goodResponse, invalidResponse } from "./response.js";
import users from "../model/userStorage.js";
import {
  GET_METHOD,
  POST_METHOD,
  PUT_METHOD,
  DELETE_METHOD,
} from "./constants.js";
import User from "../model/userCommands.js";
import { requiredFieldArr, requiredFieldIssue } from "../utils/constants.js";
import getBody from "./getBody.js";
import { isUserExist } from "./utilities.js";

export const endpointHandler = async (req, res) => {
  const url = req.url;
  const method = req.method;

  if (!url.startsWith("/api/users")) {
    return invalidResponse({ res });
  }

  const requestBody = await getBody(req);
  const userFromRequest = JSON.parse(requestBody);

  // save only endpoint after /api/users
  const endpoint = url.substring(10);

  console.log("endpoint", endpoint);

  switch (true) {
    case endpoint === "":
    case endpoint === "/": {
      if (method === GET_METHOD) {
        return goodResponse({ res, data: JSON.stringify(users) });
      } else if (method === POST_METHOD) {
        const isUserComplete = requiredFieldArr.every((field) =>
          userFromRequest.hasOwnProperty(field)
        );
        if (!isUserComplete) {
          return invalidResponse({ res, message: requiredFieldIssue });
        }
        const addedUser = User.addUser(userFromRequest);
        return goodResponse({
          res,
          data: JSON.stringify(addedUser),
          statusCode: 201,
        });
      } else {
        invalidResponse({ res, message: "Unknown request" });
      }
      break;
    }
    // /api/users/?
    case endpoint.length >= 2:
      const userId = endpoint.substring(1);
      if (!uuidValidate(userId)) {
        return invalidResponse({
          res,
          message: "userId is invalid (not uuid)",
          statusCode: 400,
        });
      }
      if (!isUserExist(userId)) {
        return invalidResponse({
          res,
          message: "Searched user does not exist",
          statusCode: 404,
        });
      }

      if (method === GET_METHOD) {
        const searchedUser = User.getUserById(userId);
        return goodResponse({ res, data: JSON.stringify(searchedUser) });
      } else if (method === PUT_METHOD) {
        User.updateUser({ id: userId, fields: userFromRequest });
        const changedUser = User.getUserById(userId);
        return goodResponse({
          res,
          data: JSON.stringify(changedUser),
          statusCode: 200,
        });
      } else if (method === DELETE_METHOD) {
        User.deleteUser(userId);
        if (isUserExist(userId)) {
          return invalidResponse({
            res,
            message: "Unexpected server side error",
            statusCode: 500,
          });
        }
        return goodResponse({
          res,
          data: `User with id:${userId} was deleted sucessfully`,
          statusCode: 204,
        });
      } else {
        invalidResponse({ res, message: "Incorrect request" });
      }
      break;

    default:
      return invalidResponse({ res, message: "Non-existing endpoint" });
  }
};
