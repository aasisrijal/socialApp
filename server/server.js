const express = require("express");
const keys = require("./keys");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");

require("dotenv").config();

const app = express();

//mongo connection
const connectionParams = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};
mongoose
  .connect(keys.MONGO_URL, connectionParams)
  .then(() => {
    console.log("Connected to database ");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/post", postRoutes);

app.get("/home", (req, res) => {
  res.send("server is working");
});

app.listen(PORT, () => {
  console.log("server is running on", PORT);
});
