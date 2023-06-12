import express from "express";


const router = express.Router();



//appel des routers

import HomeController from "../controllers/home.js";  //page d'accueil
import {Register, RegisterSubmit} from '../controllers/register.js'; //, RegisterSubmit
//liste des routes

//HOME PAGE
router.get('/', HomeController);

//INSCRIPTION PAGE

router.get('/register', Register);

router.post('/register', RegisterSubmit);


















export default router;