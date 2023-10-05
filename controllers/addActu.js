import pool from "../config/database.js";
import fs from "fs"
import formidable from "formidable"
import { v4 as uuidv4 } from 'uuid';

//****************FONCTION D'AFFICHAGE DU FORMUALIRE D'AJOUT D'ACTUALITE *******************/
export const AddActuForm = (req, res) => {
    res.render('layout', {template :'addActu'});
};


//****************FONCTION DE RECUPERATION DU FORMUALIRE D'AJOUT D'ACTUALITE *******************/
export const AddActuSubmit = (req, res) => {
    //*************** récupération des données du formulaire dans req.body ******/
	
    //****************  on utilise les name des input comme clefs de req.body *********/
	console.log('L"actualité', req.body)
	
	const SIZE_MAX = 5 * 1024 * 1024
    
    //on filtre la taille et l'extension des fichiers image que l'on dépose dans le formulaire d'ajout des actualité
    const authorizedExtention2 = ["image/jpeg","image/png","image/jpg",]
    
    const form = new formidable.IncomingForm(); 
    
   
    form.parse(req, (err, fields, files) => {
        
    
        console.log(fields)
        const addActu = {
    	titre: fields.titre,
    	contenu: fields.contenu
        }
    	const regexTitre = /^[a-zA-Z0-9\sÀ-ÿ.,!?()'-]*$/;
    	const regexContenu =/^[a-zA-Z0-9\sÀ-ÿ\n\r.,!?()'-]*$/;
	
	    if (!regexTitre.test(addActu.titre)) {
            /** test de la sécurité de l'input titre**/
            return res.status(400).send("le titre n'est pas valide");
            
        }
        if (!regexContenu.test(addActu.contenu)) {
            /** test de la sécurité de l'input contenu**/
            return res.status(400).send("le contenu n'est pas valide");
        
        }
        if (err) {
          console.error(err);
          return res.status(500).send('Une erreur est survenue lors de l\'upload de l\'image.');
        }
        
        
        if(files.myfile.size > SIZE_MAX){
            return res.status(500).send("Votre image est trop lourde")
        }
        
        //**************************  le chemin d'acces du fichier dans le tmp ***/
        const path = files.myfile.filepath
        console.log(path)
        
        //*********************recupere l'extension du fichier***************/
        const extension = files.myfile.originalFilename.split(".").pop()
        
        //**************************  le dosssier finale************/
        const newPath = "public/images/actualités/"+files.myfile.newFilename+"."+extension
        console.log(newPath)

        //****************On verifie les extension *************/
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
        
        //*************On dépose toutes ces données dans la BDD ***************************/
        pool.query('INSERT INTO Actualites (id, titre, contenu, utilisateur_id, image_url, date) VALUES (?, ?, ?, ?, ?,  CURRENT_TIME())', [uuidv4(), fields.titre, fields.contenu, "fb782d1e-aa4f-427b-b64c-fbddbe7bd4f7", displayPath], function (error, result, fields) {
	        console.log(error)
		        // une fois le post créé en BDD on redirige vers la page / (home)
		        res.redirect('/admin/actualites');
		});
    });
}




