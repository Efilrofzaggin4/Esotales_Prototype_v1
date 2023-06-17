import pool from "../config/database.js";
import fs from "fs"
import formidable from "formidable"
import { v4 as uuidv4 } from 'uuid';

export const AddImageForm = (req, res) => {
    res.render('addImage');
};

export const AddImageSubmit = (req, res) => {
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

        // // option 1
        // if(!authorizedExtention.includes(extension)){
        //     return res.status(500).send("Le fichier n'a pas la bonne extention")
        // }
        
        // option 2
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
        
        //pensez a changer utilisateurs-id à l'avenir
        pool.query('INSERT INTO Images (id, titre, url, date) VALUES (?, ?, ?, CURRENT_TIME())', [uuidv4(), fields.titre, galeriePath], function (error, result, fields) {
	        console.log(error)
		        // une fois le post créé en BDD on redirige vers la page / (home)
		        res.redirect('/admin/images');
		});
    });
}