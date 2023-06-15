import express from "express";


const router = express.Router();



//appel des routers

import HomeController from "../controllers/home.js";  //page d'accueil
import {Register, RegisterSubmit} from '../controllers/register.js'; //, RegisterSubmit
import { Login, LoginSubmit, Logout } from '../controllers/login.js';
import Admin from "../controllers/admin.js";

import {Actualites, DeleteActu, EditActu, EditActuSubmit} from "../controllers/actualites.js" //import {Actualites, ActualitesSubmit} from "../controllers/actualites.js"
import {AddActuForm, AddActuSubmit} from "../controllers/addActu.js"

import Classes from "../controllers/classes.js"
import Medias from "../controllers/medias.js"

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

//ACCUEIL ADMIN

router.get('/admin', Admin);

//GESTION D'ACTUALITES

router.get('/admin/actualites', Actualites)

router.delete('/admin/actualites/:id', DeleteActu);

router.get('/admin/actualites/addActu', AddActuForm)

router.post('/admin/actualites/addActu', AddActuSubmit)

router.get('/admin/actualites/editActu/:id', EditActu)

router.post('/admin/actualites/editActu/:id', EditActuSubmit)

//GESTION DES CLASSES

router.get('/admin/classes', Classes)



//GESTION DES MEDIAS

router.get('/admin/medias', Medias)


















export default router;