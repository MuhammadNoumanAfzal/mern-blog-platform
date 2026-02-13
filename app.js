import express from "express";
import mongoose from "mongoose";
import path from "path";
import expressLayouts from "express-ejs-layouts";
import session from "express-session";
import flash from "connect-flash";
import dotenv from "dotenv";
dotenv.config();

//MIDDLEWARE
app.use(express.json());
app.use(expressLayouts);
app.set("layout", "layout");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


//VIEW ENGINE
app.set("view engine", "ejs");


//DATABASE CONNECTION
mongoose
    .connect(process.env.MONGO_URI, )
    .then(() => console.log("Database connected"))
    .catch((err) => console.log(err));  

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
