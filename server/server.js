const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

dotenv.config();

mongoose.connect(process.env.MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("conneted to mongo yeahh");
});
mongoose.connection.on("error", (err) => {
  console.log("err connecting", err);
});

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/user", userRoutes);

app.get("/home", (req, res) => {
  res.send("server is working");
});

app.listen(PORT, () => {
  console.log("server is running on", PORT);
});
