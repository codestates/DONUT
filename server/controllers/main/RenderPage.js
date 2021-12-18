require("dotenv").config();
const { post, lpList } = require("../../models");

module.exports = async (req, res) => {
  const wholePost = await post.findAll({
    limit: 5,
    order: [["createdAt", "DESC"]],
  });
  const wholeLp = await lpList.findAll({
    limit: 20,
    order: [["createdAt", "DESC"]],
  });
  res
    .status(200)
    .json({ post: wholePost, lp: wholeLp, message: "whole post list!" });
};
