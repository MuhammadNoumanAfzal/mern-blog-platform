import express from "express";
import mongoose from "mongoose";
import path from "path";
import expressLayouts from "express-ejs-layouts";
import session from "express-session";
import flash from "connect-flash";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

import frontendRoutes from "./routes/frontend.js";
import adminRoutes from "./routes/admin.js";

dotenv.config();

const app = express();

// ✅ Fix __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MIDDLEWARE
app.use(express.json());
app.use(expressLayouts);
app.set("layout", "layout");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// VIEW ENGINE
app.set("view engine", "ejs");

// DATABASE CONNECTION
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

// ROUTES
app.use("/", frontendRoutes);

app.use("/admin", (req, res, next) => {
  res.locals.layout = "admin/layout";
  next();
});
app.use("/admin", adminRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
