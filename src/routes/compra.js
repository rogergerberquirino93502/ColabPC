const { request } = require('express');
const express = require('express');
const router = express.Router();


const pool = require('../database');
const {isLoggedIn} = require('../lib/auth');

//Seccion de productos
router.get('/add', isLoggedIn, (req, res) =>{
    res.render('compra/add');
});
router.post('/add', isLoggedIn, async (req, res) =>{
    const{ ID_PRODUCTO, PRODUCTO, CANTIDAD, PRECIO_COMPRA} = req.body;
    const newLink = {
        ID_PRODUCTO,
        PRODUCTO,
        CANTIDAD,
        PRECIO_COMPRA
    };
    await pool.query('INSERT INTO compra SET ?', [newLink]);
    req.flash('guardado', 'Guardado Exitosamente');
    res.redirect('/compra');
});
router.get('/', isLoggedIn, async (req, res) =>{
    const links = await pool.query('SELECT * FROM compra');
    res.render('compra/lista', {links});
});

router.get('/delete/:ID_COMPRA', isLoggedIn, async (req, res) =>{
    const { ID_COMPRA} = req.params;
    await pool.query('DELETE FROM compra WHERE ID_COMPRA = ?',[ID_COMPRA]);
    req.flash('guardado', 'Producto Removido');
    res.redirect('/compra');
});

router.get('/edit/:ID_COMPRA',isLoggedIn ,async (req, res) =>{
    const { ID_COMPRA} = req.params;
    const links = await pool.query('SELECT * FROM compra WHERE ID_COMPRA = ?',[ID_COMPRA]);
    res.render('compra/edit', {link: links[0]});
});

router.post('/edit/:ID_COMPRA',isLoggedIn , async (req, res) =>{
    const {ID_COMPRA} = req.params;
    const {ID_PRODUCTO, PRODUCTO, CANTIDAD, PRECIO_COMPRA} = req.body;
    const newLink = {
        ID_PRODUCTO,
        PRODUCTO,
        CANTIDAD,
        PRECIO_COMPRA
    };
    await pool.query('UPDATE compra SET ? WHERE ID_COMPRA = ?', [newLink, ID_COMPRA]);
    req.flash('guardado','Producto Actualizado');
        res.redirect('/compra');
});

module.exports = router;