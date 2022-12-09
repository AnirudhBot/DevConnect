const {
  register,
  login,
  getContacts,
} = require("../controllers/userController");
const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.get("/getContacts/:id", getContacts);

module.exports = router;
