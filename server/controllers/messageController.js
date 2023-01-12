const messageModel = require("../models/messageModel");
const User = require("../models/userModel");

//adding new message to the database
module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const toUser = await User.findOne({ username: to });
    const data = await messageModel.create({
      message,
      users: [from, toUser._id.toString()],
      sender: from,
    });

    if (data) res.json({ msg: "message added to db", status: true });
    else res.json({ msg: "failed to add message to db", status: false });
  } catch (error) {
    next(error);
  }
};

//fetching chat messages from the database
module.exports.getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    const toUser = await User.findOne({ username: to });
    if (toUser == null) return {};
    const messages = await messageModel
      .find({
        users: {
          $all: [from, toUser._id.toString()],
        },
      })
      .sort({ updatedAt: 1 });

    const finalMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message,
      };
    });
    res.json(finalMessages);
  } catch (error) {
    next(error);
  }
};
