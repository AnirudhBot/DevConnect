const User = require("../models/userModel");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res.json({ msg: "Username already exists", status: false });
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email is already in use", status: false });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      friends: [],
      requests: [],
    });
    user.password = undefined;
    return res.json({ status: true, user });
  } catch (error) {
    next(error);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.json({ msg: "Email ID not registered", status: false });
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      return res.json({ msg: "Incorrect Password", status: false });
    user.password = undefined;
    user.friends = undefined;
    user.requests = undefined;
    return res.json({ status: true, user });
  } catch (error) {
    next(error);
  }
};

module.exports.getContacts = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    const userContacts = user.friends;
    return res.json(userContacts);
  } catch (error) {
    next(error);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    let users = await User.find({ _id: { $ne: req.params.id } }).select([
      "username",
      "_id",
    ]);
    const currUser = await User.findOne({ _id: req.params.id });
    users = users.filter((ele) => {
      return !currUser.friends.find((item) => item.username === ele.username);
    });
    return res.json(users);
  } catch (error) {
    next(error);
  }
};

module.exports.sendRequest = async (req, res, next) => {
  try {
    const { username, currUserId, currUsername } = req.body;
    const user = await User.findOne({ username });
    // if (user.friends.find(({ username }) => username === currUsername))
    //   return res.json({ msg: "Existing connection", status: "false" });
    if (user.requests.find(({ username }) => username === currUsername))
      return res.json({ msg: "Already requested", status: "false" });

    const currUser = await User.findOne({ username: currUsername });
    if (currUser.requests.find(({ username }) => username === username))
      return res.json({ msg: "Check your Requests", status: "false" });

    user.requests.push({ username: currUsername, id: currUserId });
    user.save();
    return res.json({ msg: "Request sent", status: "true" });
  } catch (error) {
    next(error);
  }
};

module.exports.getRequests = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.id }).select("requests");
    return res.json(user.requests);
  } catch (error) {
    next(error);
  }
};

module.exports.acceptRequest = async (req, res, next) => {
  try {
    const { id, currUserId } = req.body;
    const acceptingUser = await User.findOne({ _id: currUserId });
    const sendingUser = await User.findOne({ _id: id });
    const acceptedIndex = acceptingUser.requests.findIndex((object) => {
      return object.id === id;
    });
    const acceptedUser = acceptingUser.requests.slice(acceptedIndex, acceptedIndex+1);
    const username = acceptedUser[0].username;
    const uid = acceptedUser[0].id;
    acceptingUser.friends.push({ username, id: uid });
    acceptingUser.requests.pull({ username, id: uid });
    acceptingUser.save();

    sendingUser.friends.push({
      username: acceptingUser.username,
      id: acceptingUser._id.toString(),
    });
    sendingUser.save();
    return res.json({ msg: "connected", status: true });
  } catch (error) {
    next(error);
  }
};
