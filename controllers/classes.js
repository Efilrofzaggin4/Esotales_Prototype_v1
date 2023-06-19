export default (req, res) => {
    res.render('layoutAdmin', {template : 'classes'});
  };

//   export const Classes = (req, res) => {
//   let sql = 'SELECT * FROM Classes ORDER BY name DESC';
  
//   pool.query(sql, function (error, classes, fields) {
//     if (error) {
//         console.error(error);
//         res.status(500).send('Erreur de base de données');
//     } else {
//         res.render('layoutAdmin', {template :  'classes',  classes: classes });
//     }
//   });
// };