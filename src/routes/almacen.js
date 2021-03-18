const { request } = require('express');
const express = require('express');
const router = express.Router();


const pool = require('../database');
const {isLoggedIn} = require('../lib/auth');

//Seccion de productos
router.get('/add', isLoggedIn, (req, res) =>{
    res.render('almacen/add');
});
router.post('/add', isLoggedIn, async (req, res) =>{
    const{ ID_COMPRA, NOMBRE, TIPO, CANTIDAD, PRECIO_VENTA} = req.body;
    const newLink = {
        ID_COMPRA,
        NOMBRE,
        TIPO,
        CANTIDAD,
        PRECIO_VENTA
    };
    await pool.query('INSERT INTO almacen SET ?', [newLink]);
    req.flash('guardado', 'Guardado Exitosamente');
    res.redirect('/almacen');
});
router.get('/', isLoggedIn, async (req, res) =>{
    const links = await pool.query('SELECT * FROM almacen');
    res.render('almacen/lista', {links});
});

router.get('/delete/:ID_ALMACEN', isLoggedIn, async (req, res) =>{
    const { ID_ALMACEN} = req.params;
    await pool.query('DELETE FROM almacen WHERE ID_ALMACEN = ?',[ID_ALMACEN]);
    req.flash('guardado', 'Producto Removido');
    res.redirect('/almacen');
});

router.get('/edit/:ID_ALMACEN',isLoggedIn ,async (req, res) =>{
    const { ID_ALMACEN} = req.params;
    const links = await pool.query('SELECT * FROM almacen WHERE ID_ALMACEN = ?',[ID_ALMACEN]);
    res.render('almacen/edit', {link: links[0]});
});
router.post('/edit/:ID_ALMACEN',isLoggedIn , async (req, res) =>{
    const {ID_ALMACEN} = req.params;
    const {ID_COMPRA, NOMBRE, TIPO, CANTIDAD, PRECIO_VENTA} = req.body;
    const newLink = {
        ID_COMPRA,
        NOMBRE,
        TIPO,
        CANTIDAD,
        PRECIO_VENTA
    };
    await pool.query('UPDATE almacen SET ? WHERE ID_ALMACEN = ?', [newLink, ID_ALMACEN]);
    req.flash('guardado','Producto Actualizado');
        res.redirect('/almacen');
});
module.exports = router;