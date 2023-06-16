// export default (req, res) => {
//     res.render('medias');
//   };

  export default (req, res) => {
    let sql = 'SELECT * FROM Medias ORDER BY date DESC';
  
    pool.query(sql, function (error, medias, fields) {
      if (error) {
        console.error(error);
        res.status(500).send('Erreur de base de données');
      } else {
        res.render('amedia', { medias: medias });
      }
    });
  };