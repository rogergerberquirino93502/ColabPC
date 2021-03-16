const { request } = require('express');
const express = require('express');
const router = express.Router();


const pool = require('../database');
const {isLoggedIn} = require('../lib/auth');
//Seccion de productos
router.get('/add', isLoggedIn, (req, res) =>{
    res.render('links/add');
});
router.post('/add', isLoggedIn, async (req, res) =>{
    const{ COD_PRODUCTO, NOM_PRODUCTO, COD_PROVEEDOR} = req.body;
    const newLink = {
        COD_PRODUCTO,
        NOM_PRODUCTO,
        COD_PROVEEDOR
    };
    await pool.query('INSERT INTO producto SET ?', [newLink]);
    req.flash('guardado', 'Guardado Exitosamente');
    res.redirect('/links');
    
});
router.get('/', isLoggedIn, async (req, res) =>{
    const links = await pool.query('SELECT * FROM producto');
    res.render('links/lista', {links});
});

router.get('/delete/:ID_PRODUCTO', isLoggedIn, async (req, res) =>{
    const { ID_PRODUCTO} = req.params;
    await pool.query('DELETE FROM producto WHERE ID_PRODUCTO = ?',[ID_PRODUCTO]);
    req.flash('guardado', 'Producto Removido');
    res.redirect('/links');
});

router.get('/edit/:ID_PRODUCTO',isLoggedIn ,async (req, res) =>{
    const { ID_PRODUCTO} = req.params;
    const links = await pool.query('SELECT * FROM producto WHERE ID_PRODUCTO = ?',[ID_PRODUCTO]);
    res.render('links/edit', {link: links[0]});
});

router.post('/edit/:ID_PRODUCTO',isLoggedIn , async (req, res) =>{
    const {ID_PRODUCTO} = req.params;
    const {COD_PRODUCTO, NOM_PRODUCTO, COD_PROVEEDOR} = req.body;
    const newLink = {
        COD_PRODUCTO,
        NOM_PRODUCTO,
        COD_PROVEEDOR
    };
    await pool.query('UPDATE producto SET ? WHERE ID_PRODUCTO = ?', [newLink, ID_PRODUCTO]);
    req.flash('guardado','Producto Actualizado');
        res.redirect('/links');
});

module.exports = router;