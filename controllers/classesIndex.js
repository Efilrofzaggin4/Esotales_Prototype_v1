import pool from "../config/database.js";

//***********cette fonction affiche pour l'utilisateur les noms(qui est un lien vers la dites classes)leur logo des classes */
export const ClassesIndex= (req, res) => {
    let sql = 'SELECT * FROM Classes ORDER BY nom';
  
    pool.query(sql, function (error, classes, fields) {
      if (error) {
        console.error(error);
        res.status(500).send('Erreur de base de données');
      } else {
        res.render('layout', {template :  'classesIndex', classes: classes });
      }
    });
  };


  //************Cette fonction affiche l'article concernant la classes séléctionnée : compétence, équipement */
  export const ShowSelectedClass = (req, res) => {
    
	let id = req.params.id;

	// on récupère la classe que le visiteur souhaite consulté
	let sql = 'SELECT * FROM Classes WHERE id = ?';

	pool.query(sql, [id], function (error, rows, fields) {
		const classes = rows; // Assigner les résultats à la variable `classes`
	        // appel du template pour consultation de la classe séléctionnée
	        res.render('layout', {template :'showSelectedClass', classes: rows[0] });
	 });
}