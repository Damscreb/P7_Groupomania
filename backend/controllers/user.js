// npm install --save bcrypt
const bcrypt = require('bcrypt');
// npm install --save jsonwebtoken
const jwt = require('jsonwebtoken'); 

var conn = require('../mySqlConfig');

exports.signup = (req, res, next) => {
  if (req.body.firstName && req.body.lastName && req.body.email && req.body.password) {
    bcrypt.hash(req.body.password, 10, (nok, hash) => {
      if (nok) return res.status(500).json({ error : nok })
      // Maintenant, on a notre hash en promise
      const time = new Date();
      conn.query(`INSERT INTO users (firstName, lastName, email, password, role, dateInscription, lastUpdate) 
                VALUES (?, ?, ?, ?, ?, ?, ?)`, [req.body.firstName, req.body.lastName, req.body.email, hash, "basic", time, time], 
        function(err, response) {
          if (err) return res.status(500).json({ error : err })
          conn.query(`SELECT * FROM users WHERE password=?`, [hash], function(error, result) {
            if (error) return res.status(500).json({ error : error });
            bcrypt.compare(req.body.password, result[0].password, function(noresultat, resultat) {
              if (noresultat) return res.status(500).json({ error : noreultat })
              if (resultat) {
                const token = jwt.sign(
                                { userId: result[0].id },
                                process.env.TOKEN,
                                { expiresIn: '24h' } )
                conn.query(`UPDATE users SET lastUpdate=now() WHERE id = ?`, [result[0].id]);
                return res.status(200).send({
                  msg: "Connexion réussie!",
                  token,
                  user: result[0]
                });
              }
              else {
                return res.status(400).json({ message: "Invalid Password" });
              }
            })
          })
        }
      )
    })
  }
};

exports.login = (req, res, next) => {
  if (req.body.email && req.body.password) {
    conn.query(`SELECT * FROM users WHERE email=?`, [req.body.email], function(err, response) {
      if (err) return res.status(500).json({ error : err });
      bcrypt.compare(req.body.password, response[0].password, function(err, result) {
        if(result) {
          const token = jwt.sign(
                          { userId: response[0].id },
                          process.env.TOKEN,
                          { expiresIn: '24h' } )
          conn.query(`UPDATE users SET lastUpdate=now() WHERE id = ?`, [response[0].id]);
          return res.status(200).send({
            msg: "Connexion réussie!",
            token,
            user: response[0]
          });
          
        }
        else {
          return res.status(400).json({ message: "Invalid Password" });
        }
      })
    })
  }
}

exports.profile = (req, res, next) => {
  const decoded = jwt.decode(req.params.token, {complete: true});
  if (decoded.payload.userId) {
    conn.query(`SELECT * FROM users WHERE id=?`, [decoded.payload.userId], function(error, user) {
      if (user.length === 0) return res.status(404).json({ error : 'Profil inconnu' });
      return res.status(200).json({ user: user })
    })
  }
  else {
    return res.status(404).json({ message : 'Mauvaise requête' })
  }
}

exports.profileComment = (req, res, next) => {
  conn.query(`SELECT firstName, lastName FROM users WHERE id=?`, [req.params.id], function(error, user) {
    if (error) return res.status(404).json({ error : 'Profil inconnu' });
    return res.status(200).json({ user: user })
  })
}

exports.deleteUser = (req, res, next) => {
  if (req.params.id) {
    conn.query('DELETE FROM commentaries WHERE userId=?', [req.params.id], function(error,result) {
      if (error) return res.status(501).json({ error : error });
    })    
    conn.query('DELETE FROM likes WHERE userId=?', [req.params.id], function(error,result) {
      if (error) return res.status(503).json({ error : error });
    })
    conn.query('DELETE FROM posts WHERE userId=?', [req.params.id], function(error,result) {
      if (error) return res.status(502).json({ error : error });
    })
    conn.query(`DELETE FROM users WHERE id=?`, [req.params.id], function(error, result){
      if (error) return res.status(500).json({ error : error });
      return res.status(200).json({ message : 'Toute trace de votre compte a bien été supprimée (commentaires, likes, posts, compte)' })
    })
  }
  else {
    return res.status(404).json({ message : 'Profil inconnu' })
  }
}

exports.modifyUser = (req, res, next) => {
  if (req.params.id) {
    conn.query('SELECT * FROM users WHERE id=?', [req.params.id], function(err,resultat) { // On vérifie qu'on modifie un utilisateur existant
      if (err) return res.status(500).json({ error : err })
      if (resultat.length === 0) {
        return res.status(404).json({ error : 'Profil inconnu' })
      }
      else {
        conn.query(`SELECT email, id FROM users WHERE email=?`, [req.body.email], function(problem, result) { // On vérifie si l'email qu'on veut update n'existe pas déjà
          if (problem) return res.status(500).json({ error : problem });
          if ((result[0] !== undefined || result === []) && req.params.id != result[0].id) {
            return res.status(500).json({ message : 'Cet email est déjà utilisé'})
          }
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            const time = new Date();
            if (req.body.email === result[0].email) { // Modification de profil SANS changement d'email
              conn.query(`UPDATE users SET firstName=?, lastName=?, password=?, lastUpdate=? WHERE id=${req.params.id}`, [req.body.firstName, req.body.lastName, hash, time], 
                function(err, success) {
                  if (err) return res.status(500).json({ error : err });
                  return res.status(200).json({ message : 'Profil mis à jour!'})
                }
              )
            }
            else { // Modification de profil AVEC changement d'email
              conn.query(`UPDATE users SET firstName=?, lastName=?, email=?, password=?, lastUpdate=? WHERE id=${req.params.id}`, [req.body.firstName, req.body.lastName, req.body.email, hash, time], 
                function(err, success) {
                  if (err) return res.status(500).json({ error : err });
                  return res.status(200).json({ message : 'Profil mis à jour!'})
                }
              )
            }
          })
        })
      }
    })
  }
}