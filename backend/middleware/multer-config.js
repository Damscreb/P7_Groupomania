// npm install --save multer
const multer = require('multer');

// Constante dictionnaire de type MIME
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif'
};

const storage = multer.diskStorage({
  
    // Nous créons une constante storage , à passer à multer comme configuration, qui contient la logique nécessaire pour indiquer à multer où enregistrer les fichiers entrants
        // La fonction destination indique à multer d'enregistrer les fichiers dans le dossier images
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  
    // La fonction filename indique à multer d'utiliser le nom d'origine, de remplacer les espaces par des underscores et d'ajouter un timestamp Date.now() comme nom de fichier.
    // Elle utilise ensuite la constante dictionnaire de type MIME pour résoudre l'extension de fichier appropriée
    // Le .split('.')[0] me permet de retirer la partie .jpeg, .jpg ou .png du fichier, vu qu'on le remet apres
  filename: (req, file, callback) => {
    const name = file.originalname.split('.')[0].split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

// Nous exportons ensuite l'élément multer entièrement configuré, lui passons notre constante storage et 
// lui indiquons que nous gérerons uniquement les téléchargements de fichiers image
module.exports = multer({storage: storage}).any('image'); 
// Le .any() permet d'envoyer x file avec x >= 0. Avait on avait single() qui n'en accepte que un -> pb