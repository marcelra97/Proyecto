const express = require('express');
const router = express.Router();
const passport = require('passport');
const Model = require('../model/gamejob.model');

router.get('/soporte', (req, res) =>{

    res.render('soporte/soporte', {
        styleSoporte: '/css/soporteStyle.css',
        soportejs: '/js/soporte.js'
    });
})

module.exports = router;
