import pool from "../config/database.js";

export default (req, res) => {
    
    const sql = 'SELECT * FROM Actualites ORDER BY date DESC LIMIT 5';
    pool.query(sql, function (error, actualites) {
      if (error) {
        console.error(error);
        res.status(500).send('Erreur de base de données');
      } else {
        res.render( 'layout', {template : 'home', actualites: actualites });
      }
    });
  };