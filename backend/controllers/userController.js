const db = require('../configuration/prisma')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class UserController {
  async register(req, res) {
    const { email, password, nickname } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)

    try {
      const existingUser = await db.prisma.user.findUnique({ where: { email } })
      if (existingUser) {
        return res.status(409).send('Email already registered')
      }

      const existingNickname = await db.prisma.userProfile.findUnique({
        where: { nickname },
      })
      if (existingNickname) {
        return res.status(409).send('Nickname already taken')
      }

      const newUser = await db.prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          profile: {
            create: {
              nickname,
            },
          },
        },
      })

      const token = jwt.sign({ userId: newUser.id }, 'your_jwt_secret')

      res.status(201).json({ token })
    } catch (error) {
      res.status(400).send(error.message)
    }
  }

  async login(req, res) {
    const { email, password } = req.body

    try {
      const user = await db.prisma.user.findUnique({
        where: { email },
        include: { profile: true },
      })

      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({ userId: user.id }, 'your_jwt_secret')

        await db.prisma.userProfile.update({
          where: { userId: user.id },
          data: { lastOnline: new Date() },
        })

        res.json({ token, nickname: user.profile.nickname, userId: user.id })
      } else {
        res.status(401).send('Invalid credentials')
      }
    } catch (error) {
      res.status(400).send(error.message)
    }
  }
}

module.exports = new UserController()
