const { request } = require('express');
const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');
//seccion de menu
router.get('/', isLoggedIn, async (req, res) =>{
    const links = await pool.query('SELECT * FROM menu');
    res.render('cliente/vista2', {links});
});
module.exports = router;