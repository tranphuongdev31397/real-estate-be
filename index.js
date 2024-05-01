const app = require("./src/app.js");

const server = app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

process.on("SIGINT", () => {
  server.close(() => console.log("Exit server express"));
});
