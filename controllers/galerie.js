import pool from "../config/database.js";


//** cette fonction gère la galerie multimédia coté utilisateur : elle prend les infomations 
//** dans les tables vidéos et images et les affiche à l'utilisateur sur la page galerie
export default (req, res) => {
  let sql1 = 'SELECT * FROM Images ORDER BY date DESC';
  let sql2 = 'SELECT * FROM Videos ORDER BY date DESC';

  pool.query(sql1, function (error1, images, fields1) {
    if (error1) {
      console.error(error1);
      res.status(500).send('Erreur de base de données');
    } else {
      pool.query(sql2, function (error2, videos, fields2) {
        if (error2) {
          console.error(error2);
          res.status(500).send('Erreur de base de données');
        } else {
          res.render('layout', { template: 'galerie', medias: { images, videos } });
        }
      });
    }
  });
};
