//Basic server dependencies and intitialization
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const routes = require("./routes");

//Dotenv stuff
const dotenv = require("dotenv");
dotenv.config();
const uri = process.env.MONGO_URI;
const PORT = process.env.PORT || 4000;

//App using things
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Connect to Database
mongoose 
 .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,   })   
 .then(() => console.log("Database connected!"))
 .catch(err => console.log(err));

// Middleware
app.use("", routes);

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
