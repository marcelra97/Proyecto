const express = require('express');
const router = express.Router();
const passport = require('passport');
const Model = require('../model/gamejob.model');

router.get('/blogs', (req, res) =>{

    res.render('blogs/blogs', {
        styleBlogs: '/css/blogsStyle.css',
        blogsjs: '/js/blogs.js'
    });
})

module.exports = router;
