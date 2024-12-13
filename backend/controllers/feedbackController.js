const db = require('../configuration/prisma')

class FeedbackController {
  async submitFeedback(req, res) {
    const userId = req.user?.userId
    const { isUseful, suggestion } = req.body

    if (!userId) {
      return res.status(401).send('User not authorized')
    }

    try {
      const existingFeedback = await db.prisma.feedback.findUnique({
        where: { userId },
      })

      if (existingFeedback) {
        return res.status(400).send('Feedback already submitted by this user')
      }

      const feedback = await db.prisma.feedback.create({
        data: {
          userId,
          isUseful,
          suggestion,
        },
      })

      res.status(201).json(feedback)
    } catch (error) {
      console.error('Error submitting feedback:', error.message)
      res.status(500).send('Error submitting feedback')
    }
  }
}

module.exports = new FeedbackController()
