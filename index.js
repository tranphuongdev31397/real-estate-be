const app = require("./src/app.js");

const server = app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

process.on("SIGINT", () => {
  server.close(() => console.log("Exit server express"));
});
