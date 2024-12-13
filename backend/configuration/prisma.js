const { PrismaClient } = require('@prisma/client')

class PrismaDatabase {
  constructor() {
    this.prisma = new PrismaClient()
  }

  async disconnect() {
    await this.prisma.$disconnect()
  }
}

module.exports = new PrismaDatabase()
