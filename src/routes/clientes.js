const { request } = require('express');
const express = require('express');
const router = express.Router();


const pool = require('../database');
const {isLoggedIn} = require('../lib/auth');

//Seccion de productos
router.get('/add', isLoggedIn, (req, res) =>{
    res.render('clientes/add');
});
router.post('/add', isLoggedIn, async (req, res) =>{
    const{ nombres, apellidos, nit, ciudad} = req.body;
    const newLink = {
        nombres,
        apellidos,
        nit,
        ciudad
    };
    await pool.query('INSERT INTO cliente SET ?', [newLink]);
    req.flash('guardado', 'Guardado Exitosamente');
    res.redirect('/clientes');
});
router.get('/', isLoggedIn, async (req, res) =>{
    const links = await pool.query('SELECT * FROM cliente');
    res.render('clientes/list', {links});
});

router.get('/delete/:id_cliente', isLoggedIn, async (req, res) =>{
    const { id_cliente} = req.params;
    await pool.query('DELETE FROM cliente WHERE id_cliente = ?',[id_cliente]);
    req.flash('guardado', 'Cliente Removido');
    res.redirect('/clientes');
});
/*
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
*/
module.exports = router;