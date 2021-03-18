const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const passport = require('passport');

const {database} = require('./keys');

//inicializar
const app = express();
require('./lib/passport');


app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');
//Peticiones al servidor
app.use(session({
    secret: 'ok',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

//Variables globales
app.use((req, res, next) => {
    app.locals.guardado = req.flash('guardado');
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
    next();
});

//Rutas, define las urls del servidor
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/links', require('./routes/links'));
app.use('/links2', require('./routes/links2'));
app.use('/menu', require('./routes/menu'));
app.use('/cliente', require('./routes/cliente'));
app.use('/links3', require('./routes/links3'));
app.use('/compra', require('./routes/compra'));
app.use('/almacen', require('./routes/almacen'));

//Public
app.use(express.static(path.join(__dirname, 'public')));


//Servidor
app.listen(app.get('port'), () =>{
    console.log('Server on port', app.get('port'));   
});