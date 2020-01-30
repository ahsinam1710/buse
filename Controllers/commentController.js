const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");
const Post = mongoose.model("Post");

exports.addComment = async (req, res) => {
  try {
    const { post_id, body } = req.body;
    if (!post_id || !body) throw "Body was not sent properly.";
    try {
      await Post.findOne({ _id: post_id });
    } catch (err) {
      throw "Post not found";
    }
    comment = new Comment({ post_id, body, user_id: req.id });
    await comment.save();
    res.json({ message: "Comment added successfully 😋" });
  } catch (err) {
    res.status(400).json({
      message: err
    });
  }
};
//join post and comment
// Comment.aggregate([
//   {
//     $lookup: {
//       from: "Post",
//       localField: "post_id",
//       foreignField: "_id",
//       as: "comments"
//     }
//   }
// ]).map((err, res) => {
//   if (err) throw err;
//   console.log(JSON.stringify(res));
//   buse.close();
// });

exports.getComment = async (req, res) => {
  const comment = await Comment.find({ post_id: req.params.post_id });
  res.json({ comment });
};
