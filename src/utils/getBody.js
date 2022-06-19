export default async (req) => {
  let body = "";

  return new Promise((resolve, reject) => {
    try {
      req.on("data", (chunk) => (body += chunk.toString()));
      req.on("end", () => resolve(body));
    } catch (err) {
      reject(err);
    }
  });
};
