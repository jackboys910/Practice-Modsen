const fs = require('fs')
const multer = require('multer')
const path = require('path')

const storageDir = path.join(__dirname, '../images')

if (!fs.existsSync(storageDir)) {
  fs.mkdirSync(storageDir, { recursive: true })
}

class UploadMiddleware {
  constructor() {
    this.upload = multer({
      storage: multer.memoryStorage(),
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/
        const mimetype = filetypes.test(file.mimetype)
        const extname = filetypes.test(
          path.extname(file.originalname).toLowerCase()
        )
        if (mimetype && extname) {
          return cb(null, true)
        }
        cb(
          new Error(
            'File upload only supports the following filetypes - ' + filetypes
          )
        )
      },
    })
  }

  handleErrors(err, req, res, next) {
    if (
      err instanceof multer.MulterError ||
      err.message.includes('File upload')
    ) {
      return res.status(400).json({ error: err.message })
    }
    next(err)
  }
}

module.exports = {
  upload: new UploadMiddleware().upload,
  handleUploadErrors: new UploadMiddleware().handleErrors,
  storageDir,
}
