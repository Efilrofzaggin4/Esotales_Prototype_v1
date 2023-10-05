import pool from "../config/database.js";

//**Cette fonction gère la page home coté utilisateur */
//**Elle affiche 6 les dernières news publiées dans le table actualités*/

export default (req, res) => {
    
    const sql = 'SELECT * FROM Actualites ORDER BY date DESC LIMIT 6';
    pool.query(sql, function (error, actualites) {
      if (error) {
        console.error(error);
        res.status(500).send('Erreur de base de données');
      } else {
        res.render( 'layout', {template : 'home', actualites: actualites });
      }
    });
  };