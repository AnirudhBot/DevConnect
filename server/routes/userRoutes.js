const {
  register,
  login,
  getContacts,
  getAllUsers,
  sendRequest,
  getRequests,
  acceptRequest,
} = require("../controllers/userController");
const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.get("/getContacts/:id", getContacts);
router.get("/getAllUsers/:id", getAllUsers);
router.post("/sendRequest", sendRequest);
router.get("/getRequests/:id", getRequests);
router.post("/acceptRequest", acceptRequest);

module.exports = router;
