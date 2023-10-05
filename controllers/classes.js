import pool from "../config/database.js";
import fs from "fs"
import formidable from "formidable"


//************appel du template pour affichage de la liste de toutes les classes en bdd
  export const Classes =  (req, res) => {
  let sql = 'SELECT * FROM Classes ORDER BY nom';
  pool.query(sql, function (error, classes, fields) {
    if (error) {
        console.error(error);
        res.status(500).send('Erreur de base de données');
    } else {
        res.render('layout', {template :  'classes',  classes: classes });
    }
  });
};


//**************FONCTION DE SUPPRESSION DE CLASSES EN BDD */
export const DeleteClasses = (req, res) => {
    
	//*******on récupère l'id de l'article à supprimer, il a été passé en paramètre de l'url
    let id = req.params.id;

	//**************requete de suppresion en BDD
	let sql = 'DELETE FROM Classes WHERE id = ?';

	pool.query(sql, [id], function (error, result, fields) {
	    if (error) {
	        console.log(error)
	        res.status(500).send({
	            error: 'Error when delete classe'
	        });
	    } else {
	        res.status(204).send();
	    }
	});
}

//**************FONCTION D'AFFICHAGE DU FORMULAIRE D'EDITION DE CLASSES EN BDD */
export const EditClasses = (req, res) => {
    
	let id = req.params.id;

	// on récupère déjà l'ancienne classes
	let sql = 'SELECT * FROM Classes WHERE id = ?';

	pool.query(sql, [id], function (error, rows, fields) {
		const actus = rows; // Assigner les résultats à la variable `actus`
	        // appel du template pour édition de classes
	        res.render('layout', {template :'editClasses',  classes: rows[0] });
	 });
}

//**************FONCTION D'ENVOI DES INFOS PASSEES DANS LE FORMULAIRE D'EDITION DE CLASSES EN BDD */
export const EditClasseSubmit = (req, res) => {
    // récupération des données du formulaire dans req.body 
	// on utilise les name des input comme clefs de req.body
	console.log('La classe', req.body)
	
	const SIZE_MAX = 5 * 1024 * 1024
    
    
    const authorizedExtention2 = ["image/jpeg","image/png","image/jpg",]
    
    const form = new formidable.IncomingForm(); 
    
   
    form.parse(req, (err, fields, files) => {
        console.log(fields)
        
        const editClasse = {
    	nom: fields.nom,
    	description: fields.description,
    	équipement: fields.équipement
        }
    	const regexNom = /^[a-zA-Z0-9\sÀ-ÿ.,!?()'-]*$/;
    	const regexDescription =/^[a-zA-Z0-9\sÀ-ÿ\n\r.,!?()'-]*$/;
	    const regexEquipement =/^[a-zA-Z0-9\sÀ-ÿ\n\r.,!?()'-]*$/;
	    
	    if (!regexNom.test(editClasse.nom)) {
            /** test de la sécurité de l'input titre**/
            return res.status(400).send("le nom n'est pas valide");
            
        }
        if (!regexDescription.test(editClasse.description)) {
            /** test de la sécurité de l'input contenu**/
            return res.status(400).send("la description n'est pas valide");
        
        }
        if (!regexEquipement.test(editClasse.équipement)) {
            /** test de la sécurité de l'input contenu**/
            return res.status(400).send("l'équipement n'est pas valide");
        
        }
        
        if (err) {
          console.error(err);
          return res.status(500).send('Une erreur est survenue lors de l\'upload de l\'image.');
        }
        
        
        if(files.image.size > SIZE_MAX){
            return res.status(500).send("Votre image est trop lourde")
        }
        if(files.classe_logo.size > SIZE_MAX){
            return res.status(500).send("Votre logo est trop lourd")
        }
        if(files.competence_image.size > SIZE_MAX){
            return res.status(500).send("Votre image des compétences est trop lourde")
        }
        
        // le chemin d'acces des fichiers dans le tmp
        const imagePath = files.image.filepath
        const logoPath = files.classe_logo.filepath
        const compPath = files.competence_image.filepath
        
        console.log(imagePath, logoPath, compPath)
        
        //recupere l'extension du fichier
        const imageExtension = files.image.originalFilename.split(".").pop()
        const logoExtension = files.classe_logo.originalFilename.split(".").pop()
        const compExtension = files.competence_image.originalFilename.split(".").pop()
        // le dosssier finale
        const newImagePath = "public/images/classes/"+files.image.newFilename+"."+imageExtension
        const newLogoPath = "public/images/logos/"+files.classe_logo.newFilename+"."+logoExtension
        const newCompPath = "public/images/compétences/"+files.competence_image.newFilename+"."+compExtension
        

        
        if(!authorizedExtention2.includes(files.image.mimetype)){
            return res.status(500).send("L'image de classe n'a pas la bonne extension")
        }
        if(!authorizedExtention2.includes(files.classe_logo.mimetype)){
            return res.status(500).send("Le Logo n'a pas la bonne extension")
        }
        if(!authorizedExtention2.includes(files.competence_image.mimetype)){
            return res.status(500).send("L'image des compétence n'a pas la bonne extension")
        }

        const finalImagePath = "images/classes/"+files.image.newFilename+"."+imageExtension
        const finalLogoPath = "images/logos/"+files.classe_logo.newFilename+"."+logoExtension
        const finalCompPath = "images/compétences/"+files.competence_image.newFilename+"."+compExtension

        console.log(finalImagePath)
        console.log(finalLogoPath)
        console.log(finalCompPath)
        

        fs.copyFile(imagePath, newImagePath, (err) => {
            if (err) {
                console.log(err);
            }
        });
        
        fs.copyFile(logoPath, newLogoPath, (err) => {
            if (err) {
                console.log(err);
            }
        });
        
        fs.copyFile(compPath, newCompPath, (err) => {
            if (err) {
                console.log(err);
            }
        });
        let id = req.params.id;
		const updateClasses = {
			image_url: finalImagePath,
			nom: fields.nom,
			classe_logo_url: finalLogoPath,
			description: fields.description,
			competence_image_url: finalCompPath,
			équipement: fields.équipement
		}
		console.log(req.body)
		// requete de modification d'une Image  
		let sql = 'UPDATE Classes SET ? WHERE id = ?';


		pool.query(sql, [updateClasses, id], function (error, result, fields) {
				    if (error) {
				        console.log(error)
				        res.status(500).send({
				            error: 'Error when update Classe'
				        });
				    } else {
				        res.redirect('/admin/classes')
				    }
		});
        
        

        
            });
        };
































// export const EditClasseSubmit = (req, res) => {
    
// 	let id = req.params.id;
	
// 	const updateClasses = {
// 		nom: req.body.nom,
// 		description: req.body.description,
// 		équipement: req.body.équipement
// 	}
// 	console.log(req.body)
// 	// requete de modification d'une Classes
// 	let sql = 'UPDATE Classes SET ? WHERE id = ?';

// 	pool.query(sql, [updateClasses, id], function (error, result, fields) {
// 	    if (error) {
// 	        console.log(error)
// 	        res.status(500).send({
// 	            error: 'Error when update classes'
// 	        });
// 	    } else {
// 	        res.redirect('/admin/classes')
// 	    }
// 	 });
// }

