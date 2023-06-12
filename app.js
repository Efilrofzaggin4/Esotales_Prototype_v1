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


// app.use(express.static("public"));
//appel du routeur
app.use('/', router);


const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
	console.log('listening port '+PORT+' all is ok');
})