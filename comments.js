//Create web server 
const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const Post = require('../models/post');

//Create a comment
router.post('/', async (req, res) => {
    const { error } = Comment.validateComment(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let post = await Post.findById(req.body.postId);
    if (!post) return res.status(400).send('Invalid post.');

    let comment = new Comment({
        comment: req.body.comment,