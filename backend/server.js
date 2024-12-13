const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const AuthMiddleware = require('./middlewares/authorizationMiddleware')
const { upload, handleUploadErrors } = require('./middlewares/uploadMiddleware')
const UserController = require('./controllers/userController')
const ProfileController = require('./controllers/profileController')
const RatingController = require('./controllers/ratingController')
const FeedbackController = require('./controllers/feedbackController')

class Server {
  constructor() {
    this.app = express()
    this.port = 4040
    this.middlewares()
    this.routes()
    this.start()
  }

  middlewares() {
    this.app.use(cors())
    this.app.use(bodyParser.json())
    this.app.use('/images', express.static(path.join(__dirname, 'images')))
  }

  routes() {
    this.app.post('/register', UserController.register)
    this.app.post('/login', UserController.login)
    this.app.post(
      '/updateProfile',
      AuthMiddleware.authenticateJWT,
      upload.single('profilePicture'),
      handleUploadErrors,
      ProfileController.updateProfile
    )
    this.app.post(
      '/resetProfile',
      AuthMiddleware.authenticateJWT,
      ProfileController.resetProfile
    )
    this.app.get(
      '/getProfile',
      AuthMiddleware.authenticateJWT,
      ProfileController.getProfile
    )
    this.app.post(
      '/setRating',
      AuthMiddleware.authenticateJWT,
      RatingController.setRating
    )
    this.app.get(
      '/getAverageRating/:bookUri',
      RatingController.getAverageRating
    )
    this.app.get(
      '/getUserRating/:bookUri',
      AuthMiddleware.authenticateJWT,
      RatingController.getUserRating
    )
    this.app.post(
      '/submitFeedback',
      AuthMiddleware.authenticateJWT,
      FeedbackController.submitFeedback
    )
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`)
    })
  }
}

new Server()
