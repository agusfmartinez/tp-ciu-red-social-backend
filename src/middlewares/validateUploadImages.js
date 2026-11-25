const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname.replace(/\s/g, "_"))
    }
})

function fileFilter (req, file, cb) {

    const esImagen = file.mimetype.startsWith("image/")

    if (esImagen){
        cb(null, true)
    } else {
        cb(new Error("Solo se permiten imagenes."))
    }
    
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // limte de 5MB
})

// solo se permiten 10 archivos
const validateUploadImages = upload.array("images", 10)

module.exports = validateUploadImages;
