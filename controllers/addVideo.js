import pool from "../config/database.js";
import fs from "fs"
import formidable from "formidable"
import { v4 as uuidv4 } from 'uuid';

//****************FONCTION D'AFFICHAGE DU FORMUALIRE D'AJOUT D'IFRAME YOUTUBE *******************/
export const AddVideoForm = (req, res) => {
    res.render('layout', {template : 'addVideo'});
};

/****************FONCTION DE RECUPERATION DU FORMUALIRE D'AJOUT D'IFRAME YOUTUBE *******************/
export const AddVideoSubmit = (req, res) => {
    const { titre, url } = req.body;
    const id = uuidv4();
    
    
	
	const regexTitre = /^[a-zA-Z0-9\sÀ-ÿ.,!?()'-]*$/;
	
	if (!regexTitre.test(titre)) {
            /** test de la sécurité de l'input titre**/
            return res.status(400).send("le titre n'est pas valide");
            
    }
    
    console.log(titre, url, id)
    // Enregistrez les informations de la vidéo dans la base de données
    const sql = 'INSERT INTO Videos (titre, url, date, id) VALUES (?, ?, CURRENT_TIME(),?)';
    
    pool.query(sql, [titre, url,id], (error, result, fields) => {
        console.log(titre, url)
      if (error) {
        console.error(error);
        res.status(500).send("Erreur lors de l'ajout de la vidéo");
        return;
      }
  
      // Redirigez l'utilisateur vers une page de confirmation ou autre
      res.redirect('/admin/videos');
    });
  };