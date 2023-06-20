import express from "express";
import session from 'express-session';
import router from "./routes/router.js";
import parseurl from "parseurl";
/*
----
----
-----
Faire un changement pour que ce soit l'utilisateur connecté qui soit dans l'id
-----
-----
----
*/

const app = express();
const port = 8000;
const hostname = "localhost";

const BASE_URL = `http://${hostname}:${port}`;

// on indique à express où sont les fichiers statiques js, image et css
app.use(express.static("public"));

//initialisation du système de sessions
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 3600000}
}));

// utilisation des template EJS grâce au modules npm "ejs"
app.set('views', './views');
app.set('view engine', 'ejs');
app.set('view options', { pretty: true });

//pour l'utilisation du json à la réception des données formulaire
app.use(express.json()) 
app.use(express.urlencoded({ extended: true })) //bien penser à recréer la base de donnée avec char 36 pour id


// app.use(express.static("public"));


app.use(function (req, res, next) {
    res.locals.isAdmin = req.session.role === 'admin';

    next();
});


const protectedRoutesRegex = /^\/admin(\/[a-zA-Z0-9]+)*$/;

app.use(function (req, res, next) {
    const route = parseurl(req).pathname;

    if (protectedRoutesRegex.test(route) && req.session.role !== 'admin') {
        res.redirect('/');
    } else {
        next();
    }
});


//appel du routeur
app.use('/', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
	console.log('listening port '+PORT+' all is ok');
})