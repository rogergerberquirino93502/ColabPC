const { request } = require('express');
const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

//seccion de menu
router.get('/addmenu', isLoggedIn,(req, res) =>{
    res.render('menu/addmenu');
});

router.post('/addmenu', isLoggedIn ,async (req, res) =>{
    const{ nombre, descripcion, precio} = req.body;
    const newLink = {
        nombre,
        descripcion,
        precio
    };
    await pool.query('INSERT INTO menu SET ?', [newLink]);
    req.flash('guardado', 'Guardado Exitosamente');
    res.redirect('/menu');
    
});

router.get('/', isLoggedIn , async (req, res) =>{
    const links = await pool.query('SELECT * FROM menu');
    res.render('menu/listamenu', {links});
});

router.get('/delete/:id_menu',isLoggedIn , async (req, res) =>{
    const { id_menu} = req.params;
    await pool.query('DELETE FROM menu WHERE id_menu = ?',[id_menu]);
    req.flash('guardado', 'Menu Removido');
    res.redirect('/menu');
});

router.get('/edit/:id_menu',isLoggedIn , async (req, res) =>{
    const { id_menu} = req.params;
    const links = await pool.query('SELECT * FROM menu WHERE id_menu = ?',[id_menu]);
    res.render('menu/editmenu', {link: links[0]});
});

router.post('/edit/:id_menu', isLoggedIn ,async (req, res) =>{
    const {id_menu} = req.params;
    const {nombre, descripcion, precio} = req.body;
    const newLink = {
        nombre,
        descripcion,
        precio
    };
    await pool.query('UPDATE menu SET ? WHERE id_menu = ?', [newLink, id_menu]);
    req.flash('guardado','Actualizado');
        res.redirect('/menu');
});
module.exports = router;