const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: String,
  body: String,
  tags: [String],
  reactions: {
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
  },
  views: { type: Number, default: 0 },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  userName: String,
  createdAt: { type: Date, default: Date.now },
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
