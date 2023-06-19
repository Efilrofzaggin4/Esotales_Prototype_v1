import pool from "../config/database.js";
import fs from "fs"
import formidable from "formidable"
import { v4 as uuidv4 } from 'uuid';

//AddClasseForm =

export default  (req, res) => {
    res.render('layoutAdmin', {template : 'addClasse'});
};

export const AddClasseSubmit = (req, res) => {
    // récupération des données du formulaire dans req.body 
	// on utilise les name des input comme clefs de req.body
	console.log('La classe', req.body)
	
	const SIZE_MAX = 5 * 1024 * 1024
    
    
    const authorizedExtention2 = ["image/jpeg","image/png","image/jpg",]
    
    const form = new formidable.IncomingForm(); 
    
   
    form.parse(req, (err, fields, files) => {
        console.log(fields)
        
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
        console.log(newPath)

        // // option 1
        // if(!authorizedExtention.includes(extension)){
        //     return res.status(500).send("Le fichier n'a pas la bonne extention")
        // }
        
        // option 2
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
        
        fs.copyFile(path, finalImagePath, finalLogoPath, finalCompPath, (err) => {
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

