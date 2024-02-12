import React from "react";
import Header from "../_components/header";
import { db } from "../_lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import BarbershopItem from "../_components/barbershop-item";

const FavoritesPage = async () => {
  const session = await getServerSession(authOptions);

  const favoriteBarbershops =
    session &&
    (await db.userFavoriteBarbershop.findMany({
      where: {
        userId: (session.user as any).id,
      },
      include: {
        barbershop: true,
      },
    }));

  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h1 className="text-xl font-bold mb-3">Barbearias favoritas</h1>

        <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {favoriteBarbershops?.map((favoriteBarbershop) => (
            <BarbershopItem barbershop={favoriteBarbershop.barbershop} key={favoriteBarbershop.id}/>
          ))}
        </div>
      </div>
    </>
  );
};

export default FavoritesPage;
