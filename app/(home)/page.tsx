import Image from "next/image";
import Header from "../_components/header";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Search from "./_components/search";
import BookingItem from "../_components/booking-item";
import { db } from "../_lib/prisma";
import BarbershopItem from "../_components/barbershop-item";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  const [
    barbershops,
    recommendedBarbershops,
    confirmedUserBookings,
    favoriteBabershops,
  ] = await Promise.all([
    db.barbershop.findMany({}),
    db.barbershop.findMany({
      orderBy: {
        id: "asc",
      },
    }),

    session?.user
      ? db.booking.findMany({
          where: {
            userId: (session.user as any).id,
            date: {
              gte: new Date(),
            },
          },
          include: {
            service: true,
            barbershop: true,
          },
        })
      : Promise.resolve([]),

    session?.user
      ? db.userFavoriteBarbershop.findMany({
          where: {
            userId: (session.user as any).id,
          },
          include: {
            barbershop: true,
          },
        })
      : Promise.resolve([]),
  ]);

  return (
    <div>
      <Header />

      <div className="px-5 pt-5">
        <h2 className="text-xl font-bold">
          {session?.user
            ? `Olá, ${session.user.name?.split(" ")[0]}`
            : "Olá. Vamos agendar um horário hoje?"}
        </h2>
        <p className="capitalize text-sm">
          {format(new Date(), "EEEE',' dd 'de' MMMM", {
            locale: ptBR,
          })}
        </p>
      </div>

      <div className="px-5 mt-6">
        <Search
          defaultValues={{
            search: "",
          }}
        />
      </div>

      <div className="mt-6">
        {confirmedUserBookings.length > 0 && (
          <div className="mb-3">
            <h2 className="text-xs uppercase text-gray-400 font-bold pl-5">
              Agendamentos
            </h2>
          </div>
        )}

        <div className=" px-5 flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {confirmedUserBookings.map((booking) => (
            <BookingItem booking={booking} key={booking.id} />
          ))}
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-3 px-5">
          <h2 className="text-xs uppercase text-gray-400 font-bold">
            Recomendados
          </h2>
        </div>

        <div className="px-5 flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <div key={barbershop.id} className="min-w-[167px] max-w-[167px]">
              <BarbershopItem barbershop={barbershop} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-3 px-5">
          <h2 className="text-xs uppercase text-gray-400 font-bold">
            Populares
          </h2>
        </div>

        <div className="px-5 flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {recommendedBarbershops.map((barbershop) => (
            <div key={barbershop.id} className="min-w-[167px] max-w-[167px]">
              <BarbershopItem barbershop={barbershop} />
            </div>
          ))}
        </div>
      </div>

      {favoriteBabershops.length > 0 && (
        <div className="mt-6 mb-[4.5rem]">
          <div className="mb-3 px-5">
            <h2 className="text-xs uppercase text-gray-400 font-bold">
              Favoritas
            </h2>
          </div>

          <div className="px-5 flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
            {favoriteBabershops.map((favoriteBarbershop) => (
              <div
                key={favoriteBarbershop.id}
                className="min-w-[167px] max-w-[167px]"
              >
                <BarbershopItem barbershop={favoriteBarbershop.barbershop} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
