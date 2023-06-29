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
		const images = rows; // Assigner les résultats à la variable `images`
	        // appel du template pour édition de L'actualité
	        res.render('editImage', { images: rows[0] });
	 });
}


export const EditImageSubmit = (req, res) => {
    // récupération des données du formulaire dans req.body 
	// on utilise les name des input comme clefs de req.body
	console.log('L"image', req.body)
	
	const SIZE_MAX = 5 * 1024 * 1024
    
    
    const authorizedExtention2 = ["image/jpeg","image/png","image/jpg",]
    
    const form = new formidable.IncomingForm(); 
    
   
    form.parse(req, (err, fields, files) => {
        console.log(fields)
        
        if (err) {
          console.error(err);
          return res.status(500).send('Une erreur est survenue lors de l\'upload de l\'image.');
        }
        
        
        if(files.myfile.size > SIZE_MAX){
            return res.status(500).send("Votre image est trop lourde")
        }
        
        // le chemin d'acces du fichier dans le tmp
        const path = files.myfile.filepath
		
        console.log(path)
        //recupere l'extension du fichier
        const extension = files.myfile.originalFilename.split(".").pop()
        // le dosssier finale
        const newPath = "public/images/galerie/"+files.myfile.newFilename+"."+extension
        console.log(newPath)


        if(!authorizedExtention2.includes(files.myfile.mimetype)){
            return res.status(500).send("Le fichier n'a pas la bonne extension")
        }
        const galeriePath = "images/galerie/"+files.myfile.newFilename+"."+extension
        console.log(galeriePath)
        
        fs.copyFile(path, newPath, (err) => {
            if(err) {
                console.log(err)
            }
        })
		let id = req.params.id;
		const titre = fields.titre
		const updateImage = {
			titre: titre,
			url: galeriePath
		}
		console.log(req.body)
		// requete de modification d'une Image  
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
        
        //pensez a changer utilisateurs-id à l'avenir
        // pool.query('INSERT INTO Images (id, titre, url, date) VALUES (?, ?, ?, CURRENT_TIME())', [uuidv4(), fields.titre, galeriePath], function (error, result, fields) {
	    //     console.log(error)
		//         // une fois le post créé en BDD on redirige vers la page / (home)
		//         res.redirect('/admin/images');
		// });


    });
}

// export const EditImageSubmit = (req, res) => {
    
// 	let id = req.params.id;
	
// 	const updateImage = {
// 		titre: req.body.titre
// 	}
// 	console.log(req.body)
// 	// requete de modification d'une Actualité  
// 	let sql = 'UPDATE Images SET ? WHERE id = ?';

// 	pool.query(sql, [updateImage, id], function (error, result, fields) {
// 	    if (error) {
// 	        console.log(error)
// 	        res.status(500).send({
// 	            error: 'Error when update image'
// 	        });
// 	    } else {
// 	        res.redirect('/admin/images')
// 	    }
// 	 });
// }