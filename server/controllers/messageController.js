const messageModel = require("../models/messageModel");

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await messageModel.create({
      message,
      users: [from, to],
      sender: from,
    });

    if (data) res.json({ msg: "message added to db", status: true });
    else res.json({ msg: "failed to add message to db", status: false });
  } catch (error) {
    next(error);
  }
};

module.exports.getMessages = async (req, res, next) => {};
