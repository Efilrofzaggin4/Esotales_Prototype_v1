import pool from "../config/database.js";
import fs from "fs"
import formidable from "formidable"
import { v4 as uuidv4 } from 'uuid';

export const AddVideoForm = (req, res) => {
    res.render('layoutAdmin', {template : 'addVideo'});
};

export const AddVideoSubmit = (req, res) => {
    const { titre, url } = req.body;
    const id = uuidv4();
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