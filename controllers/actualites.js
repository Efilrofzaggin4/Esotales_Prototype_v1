import pool from "../config/database.js";
import fs from "fs"
import formidable from "formidable"
import { v4 as uuidv4 } from 'uuid';


//************appel du template pour affichage de la liste de toutes les actualités en bdd coté admin
export const Actualites = (req, res) => {
  let sql = 'SELECT * FROM Actualites ORDER BY date DESC';

  pool.query(sql, function (error, actus, fields) {
    if (error) {
      console.error(error);
      res.status(500).send('Erreur de base de données');
    } else {
      res.render('layout',{template :  'actualites',  actus: actus });
    }
  });
};

//**************FONCTION DE SUPPRESSION D'ACTUALITE EN BDD */
export const DeleteActu = (req, res) => {
    
	//on récupère l'id de l'article à supprimer passé en paramètre de l'url
    let id = req.params.id;

	// requete de suppresion en BDD
	let sql = 'DELETE FROM Actualites WHERE id = ?';

	pool.query(sql, [id], function (error, result, fields) {
	    if (error) {
	        console.log(error)
	        res.status(500).send({
	            error: 'Error when delete actualite'
	        });
	    } else {
	        res.status(204).send();
	    }
	});
}

//**************FONCTION D'AFFICHAGE DU FORMULAIRE D'EDITION D'ACTUALITE EN BDD */
export const EditActu = (req, res) => {
    
	let id = req.params.id;

	// on récupère l'ancienne actualité
	let sql = 'SELECT * FROM Actualites WHERE id = ?';

	pool.query(sql, [id], function (error, rows, fields) {
		const actus = rows; // Assigner les résultats à la variable `actus`
	        // appel du template pour édition de L'actualité
	        res.render('layout', {template:'editActu',  actus: rows[0] });
	 });
}

//**************FONCTION D'ENVOI DES INFOS PASSEES DANS LE FORMULAIRE D'EDITION D'ACTUALITE EN BDD */
export const EditActuSubmit = (req, res) => {
    
	let id = req.params.id;
	
	const updateActu = {
		titre: req.body.titre,
		contenu: req.body.contenu
	}
	const regexTitre = /^[a-zA-Z0-9\sÀ-ÿ.,!?()'-]*$/;
	const regexContenu = /^[a-zA-Z0-9\sÀ-ÿ\n\r.,!?()'-]*$/;
	
	if (!regexTitre.test(updateActu.titre)) {
        /** test de la sécurité de l'input titre**/
        return res.status(400).send("le titre n'est pas valide");
        
  }
  if (!regexContenu.test(updateActu.contenu)) {
        /** test de la sécurité de l'input contenu**/
        return res.status(400).send("le contenu n'est pas valide");
        
  }
	
	
	console.log(req.body)
	// requete de modification d'une Actualité
	let sql = 'UPDATE Actualites SET ? WHERE id = ?';

	pool.query(sql, [updateActu, id], function (error, result, fields) {
	    if (error) {
	        console.log(error)
	        res.status(500).send({
	            error: 'Error when update actualite'
	        });
	    } else {
	        res.redirect('/admin/actualites')
	    }
	 });
}