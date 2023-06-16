import pool from "../config/database.js";
import fs from "fs"
import formidable from "formidable"
import { v4 as uuidv4 } from 'uuid';

export default (req, res) => {
    res.render('addVideo');
};

