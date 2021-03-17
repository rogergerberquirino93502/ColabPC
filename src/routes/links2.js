const { request } = require('express');
const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');
//seccion de proveedores
router.get('/add2', isLoggedIn,(req, res) =>{
    res.render('links2/add2');
});

router.post('/add2', isLoggedIn, async (req, res) =>{
    const{ COD_PROVEEDOR, NOM_PROVEEDOR} = req.body;
    const newLink = {
        COD_PROVEEDOR,
        NOM_PROVEEDOR
    };
    await pool.query('INSERT INTO proveedor SET ?', [newLink]);
    req.flash('guardado', 'Guardado Exitosamente');
    res.redirect('/links2');
    
});



router.get('/', isLoggedIn , async (req, res) =>{
    const links = await pool.query('SELECT * FROM proveedor');
    res.render('links2/lista2', {links});
});

router.get('/delete/:ID_PROVEEDOR',isLoggedIn , async (req, res) =>{
    const { ID_PROVEEDOR} = req.params;
    await pool.query('DELETE FROM proveedor WHERE ID_PROVEEDOR = ?',[ID_PROVEEDOR]);
    req.flash('guardado', 'Proveedor Removido');
    res.redirect('/links2');
});

router.get('/edit/:ID_PROVEEDOR',isLoggedIn , async (req, res) =>{
    const { ID_PROVEEDOR} = req.params;
    const links = await pool.query('SELECT * FROM proveedor WHERE ID_PROVEEDOR = ?',[ID_PROVEEDOR]);
    res.render('links2/edit2', {link: links[0]});
});

router.post('/edit/:ID_PROVEEDOR', isLoggedIn ,async (req, res) =>{
    const {ID_PROVEEDOR} = req.params;
    const {COD_PROVEEDOR, NOM_PROVEEDOR} = req.body;
    const newLink = {
        COD_PROVEEDOR,
        NOM_PROVEEDOR
    };
    await pool.query('UPDATE proveedor SET ? WHERE COD_PROVEEDOR = ?', [newLink, ID_PROVEEDOR]);
    req.flash('guardado','Proveedor Actualizado');
        res.redirect('/links2');
});

module.exports = router;