import pool from "../config/database.js";

  export const Classes =  (req, res) => {
  let sql = 'SELECT * FROM Classes ORDER BY nom';
  pool.query(sql, function (error, classes, fields) {
    if (error) {
        console.error(error);
        res.status(500).send('Erreur de base de données');
    } else {
        res.render('layoutAdmin', {template :  'classes',  classes: classes });
    }
  });
};



export const DeleteClasses = (req, res) => {
    
	//on récupère l'id de l'article à supprimer, il a été passé en paramètre de l'url
    let id = req.params.id;

	// requete de suppresion en BDD
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

export const EditClasses = (req, res) => {
    
	let id = req.params.id;

	// on récupère déjà l'ancienne classes
	let sql = 'SELECT * FROM Classes WHERE id = ?';

	pool.query(sql, [id], function (error, rows, fields) {
		const actus = rows; // Assigner les résultats à la variable `actus`
	        // appel du template pour édition de classes
	        res.render('editClasses', { classes: rows[0] });
	 });
}
/*
////////////////////////////////
/////////////////////////////

TODO : EDITCLASSESSUBMIT

//////////////////////////////
///////////////////////////
*/
// export const EditClassesSubmit = (req, res) => {
    
// 	let id = req.params.id;
	
// 	const updateClasses = {
// 		titre: req.body.titre,
// 		contenu: req.body.contenu
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
