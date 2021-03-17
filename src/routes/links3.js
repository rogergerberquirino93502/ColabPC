const express = require('express');
const router = express.Router();


const pool= require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/add', isLoggedIn,(req,res)=>{
        //res.send('Form');
        res.render('links3/add');
});

/*     inicio post addempleado   */
router.post('/addempleado', isLoggedIn, async (req,res)=>{
    //console.log(req.body);
    const { nombreempleado,id_puesto } = req.body;
const newLink = {
    nombreempleado,id_puesto
};
//console.log(newLink);
await pool.query('insert into empleado set ?', [newLink]);
//res.send('recivied'); 
res.redirect('/links3/listempleado');

});


/*     fin post addempleado   */

/*     inicio post add puesto   */
router.post('/add',isLoggedIn, async (req,res)=>{
        //console.log(req.body);
        const { nombrepuesto} = req.body;
    const newLink = {
        nombrepuesto
    };
    //console.log(newLink);
    await pool.query('insert into puesto set ?', [newLink]);
    //res.send('recivied'); 
    res.redirect('/links3/list');
});

/*     inicio get addempleado   */
router.get('/addempleado', isLoggedIn, async(req,res)=>{
    const empleado1= await pool.query('SELECT* FROM puesto');
    //res.send('Form');
    res.render('links3/addempleado',{empleado1});
});
/*  fin   get addempleado   */




/*  inicio   lista puesto   */

router.get('/', isLoggedIn, async (req,res)=>{
        const links= await pool.query('SELECT* FROM puesto');
        //const empleado= await pool.query('SELECT* FROM puesto');
        //console.log(links);
        //res.send('listas iran aqui');
        res.render('links3/list', {links});
});

router.get('/list', isLoggedIn, async (req,res)=>{
    const links= await pool.query('SELECT* FROM puesto');
    //const empleado= await pool.query('SELECT* FROM puesto');
    //console.log(links);
    //res.send('listas iran aqui');
    res.render('links3/list', {links});
    

});

/*  fin   lista puesto   */

/*  incio   lista empleado   */

router.get('/listempleado', isLoggedIn, async (req,res)=>{
    
    const links= await pool.query('SELECT * FROM empleado,puesto where empleado.id_puesto=puesto.id_puesto;');
    const empleado2= await pool.query('SELECT* FROM puesto');
    //const empleado= await pool.query('SELECT* FROM puesto');
    //console.log(links);
    //res.send('listas iran aqui');
    res.render('links3/listempleado', {links,empleado2});
    

});

/*  fin   lista empleado   */

/* inicio  BORRAR   puesto   */

router.get('/delete/:id', isLoggedIn, async (req,res) => {
    //console.log(req.params.id);
    //res.send('deleted');
    const {id}= req.params;

    await pool.query('DELETE FROM puesto WHERE id_puesto = ?  ',[id]);
    res.redirect('/links3');


});
/* fin BORRAR   puesto   */

/* inicio lista EDITAR   puesto   */
router.get('/edit/:id', isLoggedIn, async (req,res)  =>{
    const {id}=req.params;
    //console.id();
    //res.send('recibido');
     const links =await pool.query('SELECT * FROM puesto WHERE id_puesto = ? ',[id]);
     //console.log(links[0]);

     res.render('links3/edit',{link: links[0]});
    

});
/* fin  lista editar   puesto   */



/* inicio  update editar   puesto   */


router.post('/edit/:id', isLoggedIn, async (req,res)=>{


    const {id} = req.params;
    const {nombrepuesto}=req.body;
    const newLink={
        nombrepuesto
    };
    await pool.query('UPDATE puesto set ? WHERE id_puesto = ?',[newLink,id]);

    res.redirect('/links3');
});

/* fin  update editar   puesto   */


/* inicio lista EDITAR   empleado  */
router.get('/editempleado/:id', isLoggedIn, async (req,res)  =>{
    const {id}=req.params;
    //console.id();
    //res.send('recibido');
     
    const empleado3= await pool.query('SELECT* FROM puesto');
    
    //const list=await pool.query('SELECT nombrepuesto FROM puesto,empleado where empleado.id_puesto=puesto.id_puesto');


    const links =await pool.query('SELECT * FROM empleado WHERE id_empleado = ? ',[id]);
     //console.log(links[0]);

     res.render('links3/editempleado',{link: links[0],empleado3});
    

});
/* fin  lista editar   empleado  */





/* inicio  update editar   empleadto   */


router.post('/editempleado/:id', isLoggedIn, async (req,res)=>{


    const {id} = req.params;
    const {nombreempleado,id_puesto}=req.body;
    const newLink={
        nombreempleado,id_puesto
    };
    await pool.query('UPDATE empleado set ? WHERE id_empleado = ?',[newLink,id]);

    res.redirect('/links3/listempleado');
});

/* fin  update editar   puesto   */


/* inicio  BORRAR   empleado   */

router.get('/deleteempleado/:id', isLoggedIn, async (req,res) => {
    //console.log(req.params.id);
    //res.send('deleted');
    const {id}= req.params;

    await pool.query('DELETE FROM empleado WHERE id_empleado = ?  ',[id]);
    res.redirect('/links3/listempleado');


});
/* fin BORRAR   puesto   */
module.exports = router;