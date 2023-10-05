import pool from "../config/database.js";
import fs from "fs"
import formidable from "formidable"
import { v4 as uuidv4 } from 'uuid';


/**************FONCTION D'AFFICHAGE DE LA LISTE DES vidéos EN BDD */
export const Video = (req, res) => {
  let sql = 'SELECT * FROM Videos ORDER BY date DESC';

  pool.query(sql, function (error, videos, fields) {
    if (error) {
      console.error(error);
      res.status(500).send('Erreur de base de données');
    } else {
      res.render('layout', {template :  'videos',  videos: videos });
    }
  });
};


/**************FONCTION DE SUPPRESSION DE VIDEOS EN BDD */
export const DeleteVideo = (req, res) => {
    
	//on récupère l'id de l'article à supprimer, il a été passé en paramètre de l'url
    let id = req.params.id;

	// requete de suppresion en BDD
	let sql = 'DELETE FROM Videos WHERE id = ?';

	pool.query(sql, [id], function (error, result, fields) {
	    if (error) {
	        console.log(error)
	        res.status(500).send({
	            error: 'Error when delete video'
	        });
	    } else {
	        res.status(204).send();
	    }
	});
}

/**************FONCTION D'AFFICHAGE DU FORMULAIRE D'EDITION DE VIDEO EN BDD */
export const EditVideo = (req, res) => {
    
	let id = req.params.id;

	// on récupère déjà l'ancienne actualité
	let sql = 'SELECT * FROM Videos WHERE id = ?';

	pool.query(sql, [id], function (error, rows, fields) {
		const videos = rows; // Assigner les résultats à la variable `videos`
	        // appel du template pour édition de L'actualité
	        res.render('layout', {template :'editVideo', videos: rows[0] });
	 });
}

/**************FONCTION D'ENVOI DES INFOS PASSEES DANS LE FORMULAIRE D'EDITION DE video EN BDD */
export const EditVideoSubmit = (req, res) => {
    
	let id = req.params.id;
	
	const updateVideo = {
		titre: req.body.titre,
		url: req.body.url
	}
	
	const regexTitre = /^[a-zA-Z0-9\sÀ-ÿ.,!?()'-]*$/;
	
	if (!regexTitre.test(updateVideo.titre)) {
            /** test de la sécurité de l'input titre**/
            return res.status(400).send("le titre n'est pas valide");
            
  }
	console.log(req.body)
	// requete de modification d'une video  
	let sql = 'UPDATE Videos SET ? WHERE id = ?';

	pool.query(sql, [updateVideo, id], function (error, result, fields) {
	    if (error) {
	        console.log(error)
	        res.status(500).send({
	            error: 'Error when update video'
	        });
	    } else {
	        res.redirect('/admin/videos')
	    }
	 });
}
