import pool from "../config/database.js";
import fs from "fs"
import formidable from "formidable"
import { v4 as uuidv4 } from 'uuid';

//****************FONCTION D'AFFICHAGE DU FORMUALIRE D'AJOUT DE CLASSE *******************/

export const AddClasseForm =  (req, res) => {
    res.render('layout', {template : 'addClasse'});
};

//****************FONCTION DE RECUPERATION DU FORMUALIRE D'AJOUT DE CLASSE *******************/
export const AddClasseSubmit = (req, res) => {
    //******** récupération des données du formulaire dans req.body 
	
    //********* on utilise les name des input comme clefs de req.body
	console.log('La classe', req.body)
	
	const SIZE_MAX = 5 * 1024 * 1024
    
    
    const authorizedExtention2 = ["image/jpeg","image/png","image/jpg",]
    
    const form = new formidable.IncomingForm(); 
    
   
    form.parse(req, (err, fields, files) => {
        console.log(fields)
        
        const addClasse = {
    	nom: fields.nom,
    	description: fields.description,
    	équipement: fields.équipement
        }
    	const regexNom = /^[a-zA-Z0-9\sÀ-ÿ.,!?()'-]*$/;
    	const regexDescription =/^[a-zA-Z0-9\sÀ-ÿ\n\r.,!?()'-]*$/;
	    const regexEquipement =/^[a-zA-Z0-9\sÀ-ÿ\n\r.,!?()'-]*$/;
	    
	    if (!regexNom.test(addClasse.nom)) {
            /** test de la sécurité de l'input titre**/
            return res.status(400).send("le nom n'est pas valide");
            
        }
        if (!regexDescription.test(addClasse.description)) {
            /** test de la sécurité de l'input contenu**/
            return res.status(400).send("la description n'est pas valide");
        
        }
        if (!regexEquipement.test(addClasse.équipement)) {
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
        
        //************** */ le chemin d'acces des fichiers dans le tmp *************/
        const imagePath = files.image.filepath
        const logoPath = files.classe_logo.filepath
        const compPath = files.competence_image.filepath
        
        console.log(imagePath, logoPath, compPath)
        
        //**********************recupere l'extension du fichier ************/
        const imageExtension = files.image.originalFilename.split(".").pop()
        const logoExtension = files.classe_logo.originalFilename.split(".").pop()
        const compExtension = files.competence_image.originalFilename.split(".").pop()
        //******************  le dosssier finale */
        const newImagePath = "public/images/classes/"+files.image.newFilename+"."+imageExtension
        const newLogoPath = "public/images/logos/"+files.classe_logo.newFilename+"."+logoExtension
        const newCompPath = "public/images/compétences/"+files.competence_image.newFilename+"."+compExtension
        

        
        //****************On verifie les extension *************/
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
        
        
        /*** on effectue une copie des fichier vers dossiers définis précedemment  ***/
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
        
        
        

                //***************  Insertion dans la table "Classes" pour le reste des champs *******/
        const classeId = uuidv4();
                pool.query('INSERT INTO Classes (id, nom, description, équipement, image_url, classe_logo_url, competence_image_url) VALUES (?, ?, ?, ?, ?, ?, ?)', [classeId, fields.nom, fields.description, fields.équipement, finalImagePath, finalLogoPath, finalCompPath], (error, result) => {
            if (error) {
                        console.log(error);
                        return res.status(500).send("Erreur lors de l'insertion de la classe.");
            }

                    //**************  Redirection vers gestion de classes ****************/
                    res.redirect('/admin/classes');
                });
            });
        };