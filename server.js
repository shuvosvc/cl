const express = require("express");

const compression = require("compression");

const logger = require("morgan");

const path = require("path");

const api = require("./routes/auth");

const app = express();

app.use(express.json());
app.use(compression());

app.use(express.urlencoded());

app.use(logger("dev"));

app.use("/test", api);

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder for client
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.use(express.static(path.join(__dirname, "public")));

// set port
const port = process.env.API_PORT;
app.listen(port, () =>
  console.log(`Server running on port ~🚀~ http://localhost:${port}`)
);
