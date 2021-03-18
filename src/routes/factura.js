const { request } = require('express');
const express = require('express');
const router = express.Router();

const pool = require('../database');
const {isLoggedIn} = require('../lib/auth');

router.get('/add',isLoggedIn,(req,res)=>{
        //res.send('Form');
        res.render('factura/add');
});
router.get('/list',isLoggedIn,async(req,res)=>{
    //res.send('Form');
    const empleado1= await pool.query('SELECT* FROM menu');
    const empleado2= await pool.query('SELECT* FROM cliente');
    const empleado3= await pool.query('SELECT* FROM empleado');
    const links= await pool.query('SELECT* FROM factura,empleado,menu,cliente WHERE factura.id_empleado=empleado.id_empleado AND  factura.id_cliente=cliente.id_cliente AND factura.id_menu=menu.id_menu ');
    res.render('factura/list',{links,empleado1,empleado2,empleado3});
});


router.post('/add',isLoggedIn,async (req,res)=>{

        //console.log(req.body);

        const { id_cliente,id_empleado, id_menu, no_orden,total,cantidad,fecha } = req.body;
    const newLink = {
        id_cliente,id_empleado, id_menu, no_orden,total,cantidad,fecha
       
    };
    //console.log(newLink);
    await pool.query('insert into factura set ?', [newLink]);
    //res.send('recivied'); 
    res.redirect('/factura');

});



router.get('/', isLoggedIn,async (req,res)=>{
const empleado1= await pool.query('SELECT* FROM menu');
const empleado2= await pool.query('SELECT* FROM cliente');
const empleado3= await pool.query('SELECT* FROM empleado');
const links= await pool.query('SELECT* FROM factura,empleado,menu,cliente WHERE factura.id_empleado=empleado.id_empleado AND  factura.id_cliente=cliente.id_cliente AND factura.id_menu=menu.id_menu ');
res.render('factura/list',{links,empleado1,empleado2,empleado3});

});




router.get('/delete/:id_factura',isLoggedIn,async (req,res) => {
    //console.log(req.params.id);
    //res.send('deleted');
    const {id_factura}= req.params;

    await pool.query('DELETE FROM factura WHERE id_factura = ?  ',[id_factura]);
    res.redirect('/factura');


});


//router.get('/edit/:id_factura:id_cliente', async (req,res)  =>{
router.get('/edit/:id_cliente', isLoggedIn,async (req,res)  =>{
    //const {id_factura}=req.params;
    const {id_cliente}=req.params;
    //console.id();
    //res.send('recibido');
     
    //const links =await pool.query('SELECT * FROM factura,cliente WHERE  id_factura = ? AND factura.id_cliente = ? AND factura.id_cliente=cliente.id_cliente ',[id_factura,id_cliente]);
   // const links =await pool.query('SELECT * FROM factura,cliente WHERE  factura.id_cliente=cliente.id_cliente  AND factura.id_factura = ? AND factura.id_cliente = ? ',[id_factura,id_cliente]);
    //const fact =await pool.query('SELECT * FROM factura,cliente WHERE  factura.id_cliente=cliente.id_cliente  AND factura.id_cliente = ? ',[id_cliente]);
    const fact= await pool.query('SELECT* FROM factura,empleado,menu,cliente WHERE factura.id_empleado=empleado.id_empleado AND  factura.id_cliente=cliente.id_cliente AND factura.id_menu=menu.id_menu and factura.id_cliente=?',[id_cliente]);
    const pro= await pool.query('SELECT* FROM factura,empleado,menu,cliente WHERE factura.id_empleado=empleado.id_empleado AND  factura.id_cliente=cliente.id_cliente AND factura.id_menu=menu.id_menu and factura.id_cliente=?',[id_cliente]);
    const sum= await pool.query('SELECT SUM(precio) as suma FROM factura,empleado,menu,cliente WHERE factura.id_empleado=empleado.id_empleado AND  factura.id_cliente=cliente.id_cliente AND factura.id_menu=menu.id_menu and factura.id_cliente=?',[id_cliente]);
    //console.log(fact[0]);

     //res.render('links/edit',{link:links[0],fact});
    //res.render('links/edit',{fac:fact[0]});
    res.render('factura/edit',{fac:fact[0],pro,sum});
});


//router.post('/edit/:id_factura:id_cliente', async (req,res)=>{
router.post('/edit/:id_cliente', isLoggedIn,async (req,res)=>{

    const {id} = req.params;
    /*const {title,description,url}=req.body;
    const newLink={
        title,
        description,
        url

    };*/
    //await pool.query('UPDATE links set ? WHERE id = ?',[newLink,id]);

    res.redirect('/factura');
});


module.exports = router;