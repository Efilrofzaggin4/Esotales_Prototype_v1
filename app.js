import express from "express";
import router from "./routes/router.js";



const app = express();
const port = 8000;
const hostname = "localhost";

const BASE_URL = `http://${hostname}:${port}`;


// utilisation des template EJS grâce au modules npm "ejs"
app.set('views', './views');
app.set('view engine', 'ejs');
app.set('view options', { pretty: true });

//pour l'utilisation du json à la réception des données formulaire
app.use(express.json()) 
app.use(express.urlencoded({ extended: true })) //bien penser à recréer la base de donnée avec char 36 pour id


// app.use(express.static("public"));
//appel du routeur
app.use('/', router);

app.use(function (req, res, next) {
    res.locals.isAdmin = req.session.role === 'admin';

    next();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
	console.log('listening port '+PORT+' all is ok');
})