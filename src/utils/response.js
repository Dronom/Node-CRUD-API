export const goodResponse = ({ res, statusCode = 200, data }) => {
  return res.writeHead(statusCode).end(data);
};

export const invalidResponse = ({ res, statusCode = 404, message }) => {
  return res.writeHead(statusCode).end(message || "Unknown request");
};
