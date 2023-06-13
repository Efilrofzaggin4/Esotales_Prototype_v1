import pool from '../config/database.js';
import bcrypt from 'bcrypt';

export const Login = function (req, res) {
    res.render('login');
}

export const LoginSubmit = function (req, res) {
    const { email, password } = req.body;
    
    pool.query('SELECT * from Utilisateurs WHERE email = ?', [email], function (error, result) {
        if (error) {
            console.error(error);
            res.status(500).send('Erreur de base de données');
        } else {
            if (result.length < 1) {
                res.redirect('/login');
            } else {
                bcrypt.compare(password, result[0].password, function(error, isAllowed) {
                    if (isAllowed) {
                        req.session.role = result[0].role;
                        res.redirect('/admin');
                    } else {
                        res.redirect('/login');
                    }
                })
            }

        }
    });
}

export const Logout = function (req, res) {
    req.session.destroy(function (error) {
        if (error) {
            console.error(error);
        }
        
        // Redirection sur page d'accueil
        res.redirect('/');
    });
};