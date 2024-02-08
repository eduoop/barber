"use server";

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";

export const toggleFavoriteBarbershop = async (
  userId: string,
  barbershopId: string
) => {
  const existingFavorite = await db.userFavoriteBarbershop.findFirst({
    where: {
      userId: userId,
      barbershopId: barbershopId,
    },
  });

  if (existingFavorite) {
    await db.userFavoriteBarbershop.delete({
      where: {
        id: existingFavorite.id,
      },
    });
  } else {
    await db.userFavoriteBarbershop.create({
      data: {
        barbershopId: barbershopId,
        userId: userId,
      },
    });
  }

  revalidatePath(`/barbershops/${barbershopId}`);
};
