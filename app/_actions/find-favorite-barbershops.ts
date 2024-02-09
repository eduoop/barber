'use server'

import { db } from "../_lib/prisma"

export const FindFavoriteBarbershops = async (userId: string) => {
 const favoriteBarbershops = await db.userFavoriteBarbershop.findMany({
  where: {
    userId: userId
  },
  include: {
    barbershop: true
  }
 })

 return favoriteBarbershops
}
