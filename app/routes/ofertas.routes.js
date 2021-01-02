const express = require('express');
const router = express.Router();
const passport = require('passport');
const Model = require('../model/gamejob.model');

router.get('/ofertas', (req, res) =>{

    res.render('ofertas/ofertas', {
        styleOfertas:'/css/ofertasStyle.css',
        ofertasjs:'/js/ofertas.js'
    });
})

module.exports = router;
