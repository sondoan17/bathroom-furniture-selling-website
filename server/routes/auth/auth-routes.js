const express = require("express");
const cors = require("cors");
const {
  registerUser,
  loginUser,
  logoutUser,
  authMiddleware,
} = require("../../controllers/auth/auth-controller");

const router = express.Router();

router.post("/register", cors(), registerUser);
router.post("/login", cors(), loginUser);
router.post("/logout", cors(), logoutUser);
router.get("/check-auth", cors(), authMiddleware, (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "Authenticated user!",
    user,
  });
});

module.exports = router;
