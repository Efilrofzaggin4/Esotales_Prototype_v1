import pool from "../config/database.js";
import fs from "fs"
import formidable from "formidable"
import { v4 as uuidv4 } from 'uuid';

export default (req, res) => {
  let sql = 'SELECT * FROM Actualites ORDER BY date DESC';

  pool.query(sql, function (error, actus, fields) {
    if (error) {
      console.error(error);
      res.status(500).send('Erreur de base de données');
    } else {
      res.render('actualites', { actus: actus });
    }
  });
};
