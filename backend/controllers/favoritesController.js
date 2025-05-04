const db = require('../configuration/prisma')

class FavoritesController {
  async getFavorites(req, res) {
    const userId = req.user.userId

    try {
      const favorites = await db.prisma.favorite.findMany({
        where: { userId },
      })

      const booksWithDetails = await Promise.all(
        favorites.map(async (favorite) => {
          try {
            const response = await fetch(
              `https://www.googleapis.com/books/v1/volumes/${favorite.bookUri}`
            )
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`)
            }
            const data = await response.json()
            return {
              ...favorite,
              bookDetails: data,
            }
          } catch (error) {
            console.error(
              `Error fetching book data for URI ${favorite.bookUri}:`,
              error.message
            )
            return {
              ...favorite,
              bookDetails: null,
            }
          }
        })
      )

      res.status(200).json(booksWithDetails)
    } catch (error) {
      console.error('Error fetching favorites:', error.message)
      res.status(500).send('Error fetching favorites')
    }
  }

  async addFavorite(req, res) {
    const userId = req.user.userId
    const { bookUri } = req.body

    try {
      await db.prisma.book.upsert({
        where: { uri: bookUri },
        create: { uri: bookUri },
        update: {},
      })

      const existingFavorite = await db.prisma.favorite.findUnique({
        where: {
          userId_bookUri: { userId, bookUri },
        },
      })

      if (existingFavorite) {
        return res.status(400).send('Book is already in favorites')
      }

      const favorite = await db.prisma.favorite.create({
        data: {
          userId,
          bookUri,
        },
      })

      res.status(201).json(favorite)
    } catch (error) {
      console.error('Error adding favorite:', error.message)
      res.status(500).send('Error adding favorite')
    }
  }

  async removeFavorite(req, res) {
    const userId = req.user.userId
    const { bookUri } = req.params

    try {
      const favorite = await db.prisma.favorite.findUnique({
        where: {
          userId_bookUri: { userId, bookUri },
        },
      })

      if (!favorite) {
        return res.status(404).send('Favorite not found')
      }

      await db.prisma.favorite.delete({
        where: {
          userId_bookUri: { userId, bookUri },
        },
      })

      res.status(204).send()
    } catch (error) {
      console.error('Error removing favorite:', error.message)
      res.status(500).send('Error removing favorite')
    }
  }
}

module.exports = new FavoritesController()
