import pool from "../config/database.js";
import fs from "fs"
import formidable from "formidable"
import { v4 as uuidv4 } from 'uuid';

//****************FONCTION D'AFFICHAGE DU FORMUALIRE D'AJOUT D'IMAGE *******************/
export const AddImageForm = (req, res) => {
    res.render('layout', {template : 'addImage'});
};


/****************FONCTION DE RECUPERATION DU FORMUALIRE D'AJOUT D'IMAGE *******************/
export const AddImageSubmit = (req, res) => {
    //**********************récupération des données du formulaire dans req.body 
	
    //******************on utilise les name des input comme clefs de req.body
	console.log('L"image', req.body)
	
	const SIZE_MAX = 5 * 1024 * 1024
    
    
    const authorizedExtention2 = ["image/jpeg","image/png","image/jpg",]
    
    const form = new formidable.IncomingForm(); 
    
   
    form.parse(req, (err, fields, files) => {
        console.log(fields)
        
        const addImage = {
		titre: fields.titre,
		}
		const regexTitre = /^[a-zA-Z0-9\sÀ-ÿ.,!?()'-]*$/;
		
		if (!regexTitre.test(addImage.titre)) {
            /** test de la sécurité de l'input titre**/
            return res.status(400).send("le titre n'est pas valide");
            
        }
        
        if (err) {
          console.error(err);
          return res.status(500).send('Une erreur est survenue lors de l\'upload de l\'image.');
        }
        
        
        if(files.myfile.size > SIZE_MAX){
            return res.status(500).send("Votre image est trop lourde")
        }
        
        //*********le chemin d'acces du fichier dans le tmp
        const path = files.myfile.filepath
        console.log(path)
        
        //************recupere l'extension du fichier
        const extension = files.myfile.originalFilename.split(".").pop()
        
        //************le dosssier finale
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
        
        //*****************On envoit les info en BDD
        pool.query('INSERT INTO Images (id, titre, url, date) VALUES (?, ?, ?, CURRENT_TIME())', [uuidv4(), fields.titre, galeriePath], function (error, result, fields) {
	        console.log(error)
		        //******************une fois le post créé en BDD on redirige vers la page / (home)
		        res.redirect('/admin/images');
		});
    });
}