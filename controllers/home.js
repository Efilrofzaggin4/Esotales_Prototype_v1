import pool from "../config/database.js";

// export default (req, res) => {
//     res.render('home');
//   };
export default (req, res) => {
    // Effectuer une requête à la base de données pour récupérer les 5 dernières actualités
    const sql = 'SELECT * FROM Actualites ORDER BY date DESC LIMIT 5';
    pool.query(sql, function (error, actualites) {
      if (error) {
        console.error(error);
        res.status(500).send('Erreur de base de données');
      } else {
        res.render('home', { actualites: actualites });
      }
    });
  };