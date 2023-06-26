import pool from "../config/database.js";

export default (req, res) => {
    
    const sql = 'SELECT * FROM Classes ORDER BY nom';
    pool.query(sql, function (error, classes) {
      if (error) {
        console.error(error);
        res.status(500).send('Erreur de base de données');
      } else {
        res.render('home', { classes: classes });
      }
    })
};