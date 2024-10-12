const express = require('express');
const Post = require('../models/postModel');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

// Get all posts (Feed)
router.get('/feed', async (req, res) => {
  try {
    const posts = await Post.find();
    res.send(posts);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Create a new post
router.post('/create', auth, async (req, res) => {
  const { title, body, tags } = req.body;
  const post = new Post({
    title,
    body,
    tags,
    userId: req.user._id,
    userName: `${req.user.firstName} ${req.user.lastName}`,
  });

  try {
    await post.save();
    res.status(201).send(post);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a post by ID
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!post) return res.status(404).send('Post not found');
    res.send(post);
  } catch (error) {
    res.status(500).send(error);
  }
});
// Get all posts of the logged-in user
router.get('/my-posts', auth, async (req, res) => {
  try {
    // Get the user ID from the authenticated request
    const userId = req.user._id;
    
    // Find all posts by the user
    const posts = await Post.find({ userId });
    
    // If the user has no posts, return a message
    if (!posts.length) {
      return res.status(404).send({ message: 'No posts found for this user' });
    }

    res.send(posts);
  } catch (error) {
    res.status(500).send({ message: 'Error retrieving posts', error });
  }
});


module.exports = router;
