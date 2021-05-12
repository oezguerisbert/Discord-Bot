const express = require("express");
const app = express();
const mongoose = require("mongoose");
const uri = process.env.MONGO_URI
const PORT = process.env.PORT || 4000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const routes = require("./routes");

// Middleware
app.use("/api/accounts", routes);

app.get("/", (req, res) => {
  res.send("Welcome to express tutorial!");
});

// Connect to Database
mongoose.connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("connected to database!")
);



app.listen(PORT, () => console.log(`listening on port ${PORT}`));