import pool from "../config/database.js";

export const ActusIndex = (req, res) => {
    let sql = 'SELECT * FROM Actualites ORDER BY date DESC';
  
    pool.query(sql, function (error, actus, fields) {
      if (error) {
        console.error(error);
        res.status(500).send('Erreur de base de données');
      } else {
        res.render('layout', {template :  'actusIndex',  actus: actus });
      }
    });
  };

export const ShowSelectedActu = (req, res) => {
    let id = req.params.id;

	// on récupère l'actualité que le visiteur souhaite consulté
	let sql = 'SELECT * FROM Actualites WHERE id = ?';

	pool.query(sql, [id], function (error, rows, fields) {
		const actus = rows; // Assigner les résultats à la variable `classes`
	        // appel du template pour consultation de la classe séléctionnée
	        res.render('layout', {template :'showSelectedActu', actus: rows[0] });
	 });
}