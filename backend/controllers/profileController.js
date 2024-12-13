const fs = require('fs')
const path = require('path')
const sharp = require('sharp')
const db = require('../configuration/prisma')
const { storageDir } = require('../middlewares/uploadMiddleware')

class ProfileController {
  async getProfile(req, res) {
    const userId = req.user.userId
    try {
      const profile = await db.prisma.userProfile.findUnique({
        where: { userId },
        select: {
          profilePicture: true,
          description: true,
          phoneNumber: true,
          location: true,
          nickname: true,
          favoriteBook: true,
          favoriteAuthor: true,
          registeredAt: true,
          lastOnline: true,
        },
      })

      if (profile) {
        res.json(profile)
      } else {
        res.status(404).send('Profile not found')
      }
    } catch (error) {
      res.status(400).send(error.message)
    }
  }

  async updateProfile(req, res) {
    const userId = req.user.userId
    const { description, phoneNumber, location, favoriteBook, favoriteAuthor } =
      req.body
    let profilePicture = null

    if (req.file) {
      profilePicture = `${Date.now()}-${req.file.originalname}`
      const filePath = path.join(storageDir, profilePicture)

      try {
        await sharp(req.file.buffer).resize(250, 250).toFile(filePath)

        const profile = await db.prisma.userProfile.findUnique({
          where: { userId },
        })
        if (
          profile.profilePicture &&
          profile.profilePicture !== 'defaultUser.png'
        ) {
          const oldFilePath = path.join(storageDir, profile.profilePicture)
          if (fs.existsSync(oldFilePath)) {
            fs.unlinkSync(oldFilePath)
          }
        }
      } catch (error) {
        console.error('Error saving profile picture:', error.message)
        return res.status(500).send('Error saving profile picture')
      }
    }

    try {
      const updatedProfile = await db.prisma.userProfile.update({
        where: { userId },
        data: {
          profilePicture: profilePicture || undefined,
          description,
          phoneNumber,
          location,
          favoriteBook,
          favoriteAuthor,
        },
      })

      res.json(updatedProfile)
    } catch (error) {
      res.status(400).send(error.message)
    }
  }

  async resetProfile(req, res) {
    const userId = req.user.userId

    try {
      const updatedProfile = await db.prisma.userProfile.update({
        where: { userId },
        data: {
          description: null,
          phoneNumber: null,
          location: null,
          favoriteBook: null,
          favoriteAuthor: null,
          profilePicture: 'defaultUser.png',
        },
      })

      const profilePicturePath = path.join(
        storageDir,
        updatedProfile.profilePicture
      )
      if (
        fs.existsSync(profilePicturePath) &&
        updatedProfile.profilePicture !== 'defaultUser.png'
      ) {
        fs.unlinkSync(profilePicturePath)
      }

      res.json(updatedProfile)
    } catch (error) {
      res.status(400).send(error.message)
    }
  }
}

module.exports = new ProfileController()
