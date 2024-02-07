/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { db } from "../_lib/prisma";
import Header from "../_components/header";
import BarbershopItem from "../(home)/_components/barbershop-item";
import { redirect } from "next/navigation";
import Search from "../(home)/_components/search";

interface BarbershopsPageProps {
  searchParams: {
    search?: string;
  };
}

const BarbershopsPage = async ({ searchParams }: BarbershopsPageProps) => {
  const barbershops = await db.barbershop.findMany({
    where: {
      name: {
        contains: searchParams.search,
        mode: "insensitive",
      },
    },
  });

  if (!searchParams.search) {
    return redirect("/");
  }

  return (
    <>
      <Header />

      <div className="px-5 mt-6">
        <Search defaultValues={{
          search: searchParams.search
        }}/>
      </div>

      <div className="px-5 py-6">
        <h1 className="text-gray-400 font-bold text-xs uppercase">
          Resultados para "{searchParams.search}"
        </h1>

        <div className="grid grid-cols-2 mt-3 gap-4">
          {barbershops.map((barbershop) => (
            <div key={barbershop.id} className="w-full">
              <BarbershopItem barbershop={barbershop} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BarbershopsPage;
