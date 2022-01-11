import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import path from "path";
import main from "./routers/main.js"
import account from "./routers/account.js"
import connectDB from './config/db.js'
// import ejs from "ejs"

// Load config
dotenv.config({ path: "./config/config.env" });

//Set up default mongoose connection
connectDB();

const __dirname = path.resolve();
const app = express();
const port = process.env.PORT || 5000;


// // Static files
// app.use(express.static("public"));
// app.use(express.static(path.join(__dirname + '../../public')));

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Set Template engine
app.set("view engine", "ejs");

// Navigate 
app.use('/username', main)
app.use('/account', account)


// Listening on PORT
app.listen(port, (err) => {
  if (err) {
    return console.log("ERROR:", err);
  }
  console.log(colors.bgBlue.white(` App is listening on port: ${port} `));
});
