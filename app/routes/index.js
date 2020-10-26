const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index',{
        style: '/css/loginStyle.css',
        js1: '/js/login.js'
    });
});

module.exports = router;