import express from "express";


const router = express.Router();



//appel des routers

import HomeController from "../controllers/home.js";  //page d'accueil
import {Register, RegisterSubmit} from '../controllers/register.js'; //, RegisterSubmit
import { Login, LoginSubmit, Logout } from '../controllers/login.js';
//liste des routes

//HOME PAGE
router.get('/', HomeController);

//INSCRIPTION PAGE

router.get('/register', Register);

router.post('/register', RegisterSubmit);

//CONNEXION PAGE

router.get('/login', Login);

router.post('/login', LoginSubmit);

//DECONNEXION PAGE

router.get('/logout', Logout);

















export default router;