import { db } from "@/app/_lib/prisma";
import React, { ReactNode } from "react";
import BarbershopInfo from "./_components/barbershop-info";
import BarbershopLink from "./_components/barbership-link";

interface BarbershopLayoutProps {
  children: ReactNode;
  params: {
    id?: string;
  };
}
const BarbershopLayout = async ({
  children,
  params,
}: BarbershopLayoutProps) => {
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
      UserFavoriteBarbershop: true,
    },
  });

  if (!barbershop) {
    // TODO redirecionar para a homepage
    return null;
  }

  return (
    <>
      <BarbershopInfo barbershop={barbershop} />
      <div className="flex px-5 pt-6 gap-2">
        <BarbershopLink href={`/barbershops/${barbershop.id}`} name="Serviços" />
        <BarbershopLink href={`/barbershops/${barbershop.id}/details`} name="Detalhes" />
      </div>
      {children}
    </>
  );
};

export default BarbershopLayout;
