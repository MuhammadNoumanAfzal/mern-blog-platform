import userModel from "../models/User.js";
import newsModel from "../models/News.js";
import categoryModel from "../models/Category.js";
import settingModel from "../models/Setting.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// =======================
// GET: /admin/login
// =======================
const loginPage = async (req, res) => {
  return res.render("admin/login", { role: req.role });
};

// =======================
// POST: /admin/login
// =======================
const adminLogin = async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res.status(400).render("admin/login", {
        error: "Username and password are required.",
      });
    }

    const user = await userModel.findOne({ userName });

    if (!user) {
      return res.status(401).render("admin/login", {
        error: "Invalid username or password.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).render("admin/login", {
        error: "Invalid username or password.",
      });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).send("JWT_SECRET missing in .env");
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        fullName: user.fullName,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 3600000,
    });

    return res.redirect("/admin/dashboard");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

// =======================
// GET: /admin/logout
// =======================
const logout = async (req, res) => {
  res.clearCookie("token");
  return res.redirect("/admin/login");
};

// =======================
// GET: /admin/dashboard
// =======================
const dashboard = async (req, res) => {
  try {
    const articleCount = await newsModel.countDocuments();
    const usersCount = await userModel.countDocuments();
    const categoryCount = await categoryModel.countDocuments();

    return res.render("admin/dashboard", {
      role: req.role,
      fullName: req.fullName,
      articleCount,
      usersCount,
      categoryCount,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

const setting = async (req, res) => {
  return res.render("admin/setting", {
    role: req.role,
    fullName: req.fullName,
  });
};

const saveSetting = async (req, res) => {
  const { website_title, footer_description } = req.body;

const website_logo = req.file ? req.file.filename : null;
  try {
    let setting = await settingModel.findOneAndUpdate({},
      {
        website_title,
        website_logo,
        footer_description,}
      , { new: true, upsert: true });
    return res.redirect("/admin/setting");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
  
    );  




};

// =======================
// GET: /admin/users
// =======================
const allUser = async (req, res) => {
  try {
    const users = await userModel.find().lean();
    return res.render("admin/users/index", { users, role: req.role });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

// =======================
// GET: /admin/add-user
// =======================
const addUserPage = async (req, res) => {
  return res.render("admin/users/create", { role: req.role });
};

// =======================
// POST: /admin/add-user
// =======================
const addUser = async (req, res) => {
  try {
    const { fullName, userName, password, role } = req.body;

    if (!fullName || !userName || !password || !role) {
      return res.status(400).render("admin/users/create", {
        error: "All fields are required.",
      });
    }

    const existing = await userModel.findOne({ userName });

    if (existing) {
      return res.status(409).render("admin/users/create", {
        error: "Username already exists.",
      });
    }

    // ✅ DO NOT hash here — schema pre-save middleware will hash automatically
    await userModel.create({
      fullName,
      userName,
      password,
      role,
    });

    return res.redirect("/admin/users");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

// =======================
// GET: /admin/update-user/:id
// =======================
const updateUserPage = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id).lean();

    if (!user) return res.status(404).send("User not found");

    return res.render("admin/users/update", { user, role: req.role });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

// =======================
// POST: /admin/update-user/:id
// =======================
const updateUser = async (req, res) => {
  try {
    const { userName, password, role, fullName } = req.body;

    const user = await userModel.findById(req.params.id);

    if (!user) return res.status(404).send("User not found");

    if (fullName && fullName.trim()) {
      user.fullName = fullName.trim();
    }

    if (userName && userName.trim()) {
      const exists = await userModel.findOne({
        userName: userName.trim(),
        _id: { $ne: user._id },
      });

      if (exists) {
        return res.status(409).render("admin/users/update", {
          user: user.toObject(),
          error: "Username already exists.",
        });
      }

      user.userName = userName.trim();
    }

    if (role && role.trim()) {
      user.role = role.trim();
    }

    // ✅ Just assign plain password — schema will hash automatically
    if (password && password.trim().length > 0) {
      user.password = password.trim();
    }

    await user.save();

    return res.redirect("/admin/users");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

// =======================
// DELETE: /admin/delete-user/:id
// =======================
const deleteUser = async (req, res) => {
  try {
    const user = await userModel.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User deleted",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export {
  loginPage,
  adminLogin,
  logout,
  dashboard,
  setting,
  saveSetting,
  allUser,
  addUserPage,
  addUser,
  updateUserPage,
  updateUser,
  deleteUser,
};
