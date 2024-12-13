const db = require('../configuration/prisma')

class RatingController {
  async setRating(req, res) {
    const userId = req.user?.userId
    const { bookUri, rating } = req.body

    if (!userId) {
      return res.status(401).send('User not authorized')
    }

    if (!bookUri || !rating || rating < 1 || rating > 5) {
      return res.status(400).send('Invalid rating or book URI')
    }

    try {
      const book = await db.prisma.book.upsert({
        where: { uri: bookUri },
        create: { uri: bookUri },
        update: {}, // Ничего не обновляем, если книга уже существует
      })

      const userRating = await db.prisma.userBookRating.upsert({
        where: { userId_bookUri: { userId, bookUri } },
        update: { rating },
        create: { userId, bookUri, rating },
      })

      const { _avg } = await db.prisma.userBookRating.aggregate({
        where: { bookUri },
        _avg: { rating: true },
      })

      await db.prisma.bookAverageRating.upsert({
        where: { bookUri },
        update: { average: _avg.rating },
        create: { bookUri, average: _avg.rating },
      })

      res.json({
        userRating,
        averageRating: _avg.rating,
      })
    } catch (error) {
      console.error('Error setting rating:', error)
      res.status(500).send('An error occurred while setting the rating')
    }
  }

  async getAverageRating(req, res) {
    const { bookUri } = req.params

    try {
      const averageRating = await db.prisma.bookAverageRating.findUnique({
        where: { bookUri },
      })

      res.json({
        averageRating: averageRating?.average || 0,
      })
    } catch (error) {
      console.error('Error fetching average rating:', error)
      res
        .status(500)
        .send('An error occurred while fetching the average rating')
    }
  }

  async getUserRating(req, res) {
    const userId = req.user?.userId
    const { bookUri } = req.params

    if (!userId) {
      return res.status(401).send('User not authorized')
    }

    try {
      const userRating = await db.prisma.userBookRating.findUnique({
        where: { userId_bookUri: { userId, bookUri } },
      })

      res.json({
        userRating: userRating?.rating || 0,
      })
    } catch (error) {
      console.error('Error fetching user rating:', error)
      res.status(500).send('An error occurred while fetching the user rating')
    }
  }
}

module.exports = new RatingController()
