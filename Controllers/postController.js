const mongoose = require("mongoose");
const Post = mongoose.model("Post");

exports.addPost = async (req, res) => {
  try {
    const { title, body } = req.body;
    if (!title || !body) throw "Body was not sent properly.";
    post = new Post({ title, body, user_id: req.id });
    await post.save();
    res.json({ message: "Post added successfully 😋" });
  } catch (err) {
    res.status(400).json({
      message: err
    });
  }
};

exports.getPost = async (req, res) => {
  const post = await Post.find({ user_id: req.params.user_id });
  res.json({ post });
};
