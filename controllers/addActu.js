import pool from "../config/database.js";
import fs from "fs"
import formidable from "formidable"
import { v4 as uuidv4 } from 'uuid';

export const AddActuForm = (req, res) => {
    res.render('layout', {template :'addActu'});
};

export const AddActuSubmit = (req, res) => {
    // récupération des données du formulaire dans req.body 
	// on utilise les name des input comme clefs de req.body
	console.log('L"actualité', req.body)
	
	const SIZE_MAX = 5 * 1024 * 1024
    
    // // option 1
    // const authorizedExtention = ["jpg","jpeg","png"]
    
    //option 2
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
        const newPath = "public/images/actualités/"+files.myfile.newFilename+"."+extension
        console.log(newPath)

        // // option 1
        // if(!authorizedExtention.includes(extension)){
        //     return res.status(500).send("Le fichier n'a pas la bonne extention")
        // }
        
        // option 2
        if(!authorizedExtention2.includes(files.myfile.mimetype)){
            return res.status(500).send("Le fichier n'a pas la bonne extension")
        }
        const displayPath = "images/actualités/"+files.myfile.newFilename+"."+extension
        console.log(displayPath)
        
        fs.copyFile(path, newPath, (err) => {
            if(err) {
                console.log(err)
            }
        })
        
        //pensez a changer utilisateurs-id à l'avenir
        pool.query('INSERT INTO Actualites (id, titre, contenu, utilisateur_id, image_url, date) VALUES (?, ?, ?, ?, ?,  CURRENT_TIME())', [uuidv4(), fields.titre, fields.contenu, "fb782d1e-aa4f-427b-b64c-fbddbe7bd4f7", displayPath], function (error, result, fields) {
	        console.log(error)
		        // une fois le post créé en BDD on redirige vers la page / (home)
		        res.redirect('/admin/actualites');
		});
    });
}

// export const DeletePost = (req, res) => 
// {

//     //on récupère l'id de l'article à supprimer, il a été passé en paramètre de l'url
//     let id = req.params.id;

//     // requete de suppresion en BDD
//     let sql1 = "delete from comments where article_id= ?";
//     let sql2 = 'DELETE FROM articles WHERE id = ?';

//     // pool.query(sql1, [id], function (error, result, fields) 
//     // {
//     //     if(error) {console.log("error requête 1");}

//         pool.query(sql2, [id], function (error, result, fields) {
//         if (error) {
//             console.log(error)
//             res.status(500).send({
//                 error: 'Error when delete post'
//             });
//         } else {
//             res.status(204).send();
//         }

//     });
// };


