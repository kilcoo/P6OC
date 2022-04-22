const multer = require('multer');           // on demande d'utiliser multer

const MIME_TYPES = {                        // extension des images
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({                      // on enrengiste dans le disque
  destination: (req, file, callback) => {                // on demander d'enrengister les images dans le dossier image
    callback(null, 'images');
  },
  filename: (req, file, callback) => {                          
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];                // on utilise la variale qui possede les extensions
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('image');

