import { PrismaClient } from '@prisma/client'
import { products } from './data/products'
import { categories } from './data/categories'

const prisma = new PrismaClient()

async function main() {
  try {
    await prisma.category.createMany({
        data: categories
    })
    await prisma.product.createMany({
        data: products
    })
  } catch (error) {
    console.error(error)
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })