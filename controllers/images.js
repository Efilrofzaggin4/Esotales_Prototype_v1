import pool from "../config/database.js";
import fs from "fs"
import formidable from "formidable"
import { v4 as uuidv4 } from 'uuid';

export const Image = (req, res) => {
  let sql = 'SELECT * FROM Images ORDER BY date DESC';

  pool.query(sql, function (error, images, fields) {
    if (error) {
      console.error(error);
      res.status(500).send('Erreur de base de données');
    } else {
      res.render('layout', {template :  'images',  images: images });
    }
  });
};

export const DeleteImage = (req, res) => {
    
	//on récupère l'id de l'article à supprimer, il a été passé en paramètre de l'url
    let id = req.params.id;

	// requete de suppresion en BDD
	let sql = 'DELETE FROM Images WHERE id = ?';

	pool.query(sql, [id], function (error, result, fields) {
	    if (error) {
	        console.log(error)
	        res.status(500).send({
	            error: 'Error when delete image'
	        });
	    } else {
	        res.status(204).send();
	    }
	});
}
export const EditImage = (req, res) => {
    
	let id = req.params.id;

	// on récupère déjà l'ancienne actualité
	let sql = 'SELECT * FROM Images WHERE id = ?';

	pool.query(sql, [id], function (error, rows, fields) {
		const images = rows; // Assigner les résultats à la variable `actus`
	        // appel du template pour édition de L'actualité
	        res.render('editImage', { images: rows[0] });
	 });
}
export const EditImageSubmit = (req, res) => {
    
	let id = req.params.id;
	
	const updateImage = {
		titre: req.body.titre,
		url: req.body.url
	}
	console.log(req.body)
	// requete de modification d'une Actualité  
	let sql = 'UPDATE Images SET ? WHERE id = ?';

	pool.query(sql, [updateImage, id], function (error, result, fields) {
	    if (error) {
	        console.log(error)
	        res.status(500).send({
	            error: 'Error when update image'
	        });
	    } else {
	        res.redirect('/admin/images')
	    }
	 });
}