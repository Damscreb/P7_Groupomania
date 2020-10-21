// Il nous faut une nouvelle importation. Il s'agit du package fs de Node (pour la suppression du fichier image)
const fs = require('fs');

var conn = require('../mySqlConfig');

exports.getAllPosts = (req, res) => {
    conn.query('SELECT * FROM posts ORDER BY date DESC', function(error, result) {
            if (error) res.status(500).json({ error : error })
            conn.query(`SELECT * FROM likes WHERE type=?`,[1], function(erro,likes) {
                if (erro) return res.status(500).json({ error : erro });
                conn.query(`SELECT * FROM likes WHERE type=?`, [req.params.id, -1], function(errors,dislikes) {
                    if (erro) return res.status(500).json({ error : errors });
                    return res.status(200).json({ post : result,
                                                 likes: likes,
                                                 dislikes: dislikes
                                                });
                })
            })
        }
    )
}

// J'arrive à créer un post mais l'image ne se save pas, c'est parce que j'envoie juste une url et pas une image issue de mon ordi
exports.createPost = (req, res) => {
    if (req.body.userId && req.body.title && req.body.imageUrl) {
        const time = new Date();
        conn.query('INSERT INTO posts (userId, title, date, imageUrl) VALUES (?, ?, ?, ?)', [req.body.userId, req.body.title, time, req.body.imageUrl], function(error) {
            if (error) return res.status(500).json({ error : 'Mauvais arguments' });
        })
        return res.status(200).json({ message : 'Post créé' })
    }
    else {
        return res.status(500).json({ error : 'Mauvais arguments' });
    }
}

exports.getOnePost = (req, res) => {
    if (req.params.id) {
        conn.query(`SELECT * FROM posts WHERE id=?`, [req.params.id], function(error,result){
            if (error) return res.status(500).json({ error : error });
            conn.query(`SELECT * FROM commentaries WHERE postId=?`, [req.params.id], function(err,resultat) {
                if (err) return res.status(500).json({ error : err });
                conn.query(`SELECT * FROM likes WHERE postId=? AND type=?`, [req.params.id, 1], function(erro,likes) {
                    if (erro) return res.status(500).json({ error : erro });
                    conn.query(`SELECT * FROM likes WHERE postId=? AND type=?`, [req.params.id, -1], function(errors,dislikes) {
                        if (errors) return res.status(500).json({ error : errors });
                        return res.status(200).json({ post : result,
                                                     commentaires : resultat,
                                                     likes: likes,
                                                     dislikes: dislikes
                                                    });
                    })
                })
            })
        })
    }
    else {
        return res.status(404).json({ error : 'Post inconnu' });
    }
}

exports.myPosts = (req, res) => {
    if (req.params.userId) {
        conn.query('SELECT * FROM posts WHERE userId=? ORDER BY date DESC', [req.params.userId], function(error, result) {
            if (error) return res.status(404).json({ error : error })
            conn.query(`SELECT * FROM commentaries WHERE postId=?`, [result[0].id], function(err,resultat) {
                if (err) return res.status(500).json({ error : err });
                conn.query(`SELECT * FROM likes WHERE postId=?`, [result[0].id], function(errs,resultats) {
                    if (errs) return res.status(500).json({ error : errs });
                    return res.status(200).json({ post : result,
                                                  commentaires : resultat,
                                                  likes: resultats})
                })
            })
        })
    }
}

exports.modifyPost = (req, res) => {
    if (req.params.id && req.body.title && req.body.imageUrl && req.body.userId) {
        const filename = req.body.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
            const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.body.imageUrl}`;
            conn.query('UPDATE posts SET title=?, imageUrl=? WHERE id=?', [req.body.title, imageUrl, req.params.id], function(result, error) {
                if (error) return res.status(500).json({ error : 'Nique' });
                return res.status(200).json({ message : 'Post modifié avec succès !' })
            })
        })
    }
    else {
        return res.status(500).json({ error : 'Mauvais paramétrage de la requête' })
    }
}

exports.deletePost = (req, res) => {
    if (req.params.id) {
        conn.query('DELETE FROM commentaries WHERE postId=?', [req.params.id], function(error) {
            if (error) return res.status(501).json({ error : error });
        })    
        conn.query('DELETE FROM likes WHERE postId=?', [req.params.id], function(error) {
            if (error) return res.status(503).json({ error : error });
        })
        conn.query('DELETE FROM posts WHERE id=?', [req.params.id], function(error) {
            if (error) return res.status(502).json({ error : error });
        })
        return res.status(200).json({message : "Post supprimé!"})
    }
    else {
        return res.status(404).json({ message : 'Post inconnu' })
    }
}

exports.getLikesDislikes = (req,res) => {
    if (req.params.id) {
        conn.query('SELECT * FROM likes WHERE type=? AND postId =?', [1, req.params.id],function(errors,nbeLikes){
            if (errors) return res.status(500).json({ error : errors });
            conn.query('SELECT * FROM likes WHERE type=? AND postId =?', [-1, req.params.id],function(problem,nbeDislikes){
                if (problem) return res.status(500).json({ error : problem });
                return res.status(200).json({ likes: nbeLikes.length ,
                                              dislikes: nbeDislikes.length
                });
            })
        })
    }
    else {
        return res.status(500).json({ message : "Mauvaise requête" })
    }
}

exports.likePost = (req, res) => {
    if (req.params.id && req.body.userId && req.body.type) {
        
        if (req.body.type == 1) {  // Cas du like de post  
            conn.query('SELECT id FROM likes WHERE userId = ? AND postId =?', [req.body.userId, req.params.id], function(error, result) {
                
                if  (result[0] !== undefined || result === []) { // Cas du unlike
                    conn.query('DELETE FROM likes WHERE userId = ? AND postId =?', [req.body.userId, req.params.id], function(error,resultat){
                        if (error) return res.status(500).json({ error : error });
                        conn.query('SELECT * FROM likes WHERE type=? AND postId =?', [1, req.params.id],function(errors,nbeLikes){
                            if (error) return res.status(500).json({ error : errors });
                            conn.query('SELECT * FROM likes WHERE type=? AND postId =?', [-1, req.params.id],function(problem,nbeDislikes){
                                if (error) return res.status(500).json({ error : problem });
                                return res.status(200).json({ message : "Like ou dislike retiré!",
                                                              likes: nbeLikes.length ,
                                                              dislikes: nbeDislikes.length
                                });
                            })
                        })
                    })
                }     
            
                else { // Cas du like si il n'y en avait pas avant 
                    conn.query('INSERT INTO likes (userId, postId, type) VALUES (?, ?, ?)',
                    [req.body.userId, req.params.id, req.body.type], function(error, resultat) {
                        if (error) return res.status(500).json({ error : error });
                        conn.query('SELECT * FROM likes WHERE type=? AND postId =?', [1, req.params.id],function(errors,nbeLikes){
                            if (error) return res.status(500).json({ error : errors });
                            conn.query('SELECT * FROM likes WHERE type=? AND postId =?', [-1, req.params.id],function(problem,nbeDislikes){
                                if (error) return res.status(500).json({ error : problem });
                                return res.status(200).json({ message : "Post liké!",
                                                              likes: nbeLikes.length ,
                                                              dislikes: nbeDislikes.length
                                });
                            })
                        })
                    })
                }
            })
        }        
        else if (req.body.type == -1) {  // Cas du dislike de post
            conn.query('SELECT id FROM likes WHERE userId = ? AND postId =?', [req.body.userId, req.params.id], function(error, result) {
                
                if  (result[0] !== undefined || result === []) { // Cas du undislike
                    conn.query('DELETE FROM likes WHERE userId = ? AND postId =?', [req.body.userId, req.params.id], function(error,resultat){
                        if (error) return res.status(500).json({ error : error });
                        conn.query('SELECT * FROM likes WHERE type=? AND postId =?', [1, req.params.id],function(errors,nbeLikes){
                            if (error) return res.status(500).json({ error : errors });
                            conn.query('SELECT * FROM likes WHERE type=? AND postId =?', [-1, req.params.id],function(problem,nbeDislikes){
                                if (error) return res.status(500).json({ error : problem });
                                return res.status(200).json({ message : "Like ou dislike retiré!",
                                                              likes: nbeLikes.length ,
                                                              dislikes: nbeDislikes.length
                                });
                            })
                        })
                    })
                }     
            
                else { // Cas du dislike si il n'y en avait pas avant 
                    conn.query('INSERT INTO likes (userId, postId, type) VALUES (?, ?, ?)',
                    [req.body.userId, req.params.id, req.body.type], function(error, resultat) {
                        if (error) return res.status(500).json({ error : error });
                        conn.query('SELECT * FROM likes WHERE type=? AND postId =?', [1, req.params.id],function(errors,nbeLikes){
                            if (error) return res.status(500).json({ error : errors });
                            conn.query('SELECT * FROM likes WHERE type=? AND postId =?', [-1, req.params.id],function(problem,nbeDislikes){
                                if (error) return res.status(500).json({ error : problem });
                                return res.status(200).json({ message : "Post disliké!",
                                                              likes: nbeLikes.length ,
                                                              dislikes: nbeDislikes.length
                                });
                            })
                        })
                    })
                }
            })
        }
    }
    else {
        return res.status(500).json({ message : "Mauvais paramétrage de la requête" })
    }
}

exports.createComment = (req, res) => {
    if (req.body.userId && req.body.comment) {
        const time = new Date;
        conn.query('INSERT INTO commentaries (userId, postId, date, comment) VALUES (?, ?, ?, ?)', [req.body.userId, req.params.id, time, req.body.comment], function(error){
            if (error) return res.status(500).json({ error : error });
            return res.status(200).json({ message : req.body.comment })
        })
    }
    else {
        return res.status(500).json({ error : 'Mauvais paramétrage de la requête' })
    }
}

exports.modifyComment = (req, res) => {
    if (req.body.userId && req.body.comment) {
        const time = new Date;
        conn.query('UPDATE commentaries SET comment=?, date=? WHERE id=?', [req.body.comment, time, req.params.idcomment], function(error, result) {
            if (error) return res.status(500).json({ error : error });
            return res.status(200).json({ message : 'Commentaire modifié !' })
        })
    }
    else {
        return res.status(500).json({ error : 'Mauvais paramétrage de la requête' })
    }
}

exports.deleteComment = (req, res) => {
    conn.query('DELETE FROM commentaries WHERE id=?', [req.params.idcomment], function(error, result) {
        if (error) return res.status(500).json({ message : error });
        return res.status(200).json({ message : 'Commentaire supprimé!' })
    })
}