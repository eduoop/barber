import { Button } from "@/app/_components/ui/button";
import { db } from "@/app/_lib/prisma";
import {
  ChevronLeftIcon,
  LocateFixed,
  LocateIcon,
  MapPin,
  MapPinIcon,
  MenuIcon,
  StarIcon,
} from "lucide-react";
import Image from "next/image";
import React from "react";
import BarbershopInfo from "./_components/barbershop-info";
import ServiceItem from "./_components/service-item";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth";
import BarbershopLink from "./_components/barbership-link";

interface BarbershopDetailsProps {
  params: {
    id?: string;
  };
}

const BarbershopDetails = async ({ params }: BarbershopDetailsProps) => {
  if (!params.id) {
    // TODO redirecionar para a homepage
    return null;
  }

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

  const session = await getServerSession(authOptions);

  return (
    <div className="px-5 flex flex-col gap-4 py-6">
      {barbershop.services.map((service) => (
        <ServiceItem
          barbershop={barbershop}
          isAuthenticated={!!session?.user}
          key={service.id}
          service={service}
        />
      ))}
    </div>
  );
};

export default BarbershopDetails;
