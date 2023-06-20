import express from "express";


const router = express.Router();



//appel des routers

import HomeController from "../controllers/home.js";  //page d'accueil
import {Register, RegisterSubmit} from '../controllers/register.js'; //, RegisterSubmit
import { Login, LoginSubmit, Logout } from '../controllers/login.js';
import Admin from "../controllers/admin.js";

import {Actualites, DeleteActu, EditActu, EditActuSubmit} from "../controllers/actualites.js" //import {Actualites, ActualitesSubmit} from "../controllers/actualites.js"
import {AddActuForm, AddActuSubmit} from "../controllers/addActu.js"

import {Classes, DeleteClasses, EditClasses} from "../controllers/classes.js"
import {AddClasseForm, AddClasseSubmit} from "../controllers/addClasse.js"

import {Video, DeleteVideo, EditVideo, EditVideoSubmit} from "../controllers/videos.js"
import {AddVideoForm, AddVideoSubmit} from "../controllers/addVideo.js";

import {Image, DeleteImage, EditImage, EditImageSubmit} from "../controllers/images.js"
import {AddImageForm, AddImageSubmit} from "../controllers/addImage.js"


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

router.delete('/admin/classes/:id', DeleteClasses);

router.get('/admin/classes/addClasse', AddClasseForm)

router.post('/admin/classes/addClasse', AddClasseSubmit);

router.get('/admin/classes/editClasses/:id', EditClasses)


//GESTION DES MEDIAS

router.get('/admin/videos', Video)

router.delete('/admin/videos/:id', DeleteVideo);

router.get('/admin/videos/addVideo', AddVideoForm)

router.post('/admin/videos/addVideo', AddVideoSubmit);

router.get('/admin/videos/editVideo/:id', EditVideo)

router.post('/admin/videos/editVideo/:id', EditVideoSubmit)



router.get('/admin/images', Image)

router.delete('/admin/images/:id', DeleteImage);

router.get('/admin/images/editImage/:id', EditImage)

router.post('/admin/images/editImage/:id', EditImageSubmit)

router.get('/admin/images/addImage', AddImageForm)

router.post('/admin/images/addImage', AddImageSubmit);















export default router;