"use client"

import { Card, CardContent } from "@/app/_components/ui/card";
import React from "react";
import { Barbershop } from "@prisma/client";
import Image from "next/image";
import { Button } from "@/app/_components/ui/button";
import { Badge } from "@/app/_components/ui/badge";
import { StarIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface BarbershopItem {
  barbershop: Barbershop;
}

const BarbershopItem = ({ barbershop }: BarbershopItem) => {

  const router = useRouter()

  const handleBookingClick = () => {
    router.push(`/barbershops/${barbershop.id}`)
  }

  return (
    <Card className="min-w-full max-w-full rounded-2xl">
      <CardContent className="px-1 py-0">
        <div className="relative w-full h-[159px]">
          <div className="absolute top-2 left-2 z-50">
            <Badge variant={"secondary"} className="opacity-90 flex gap-1 items-center cursor-default">
              <StarIcon className="mb-[2px] fill-primary text-primary" size={12} />
              <span className="text-xs">5,0</span>
            </Badge>
          </div>
          <Image
            alt="Barber image"
            src={barbershop.imageUrl}
            fill
            sizes="100vw"
            className="rounded-2xl"
            style={{
              objectFit: "cover",
            }}
          />
        </div>

        <div className="px-2 pb-3">
          <h2 className="font-bold mt-2 overflow-hidden text-ellipsis text-nowrap">
            {barbershop.name}
          </h2>
          <p className="text-sm text-gray-400 overflow-hidden text-ellipsis text-nowrap">
            {barbershop.address}
          </p>
          <Button onClick={handleBookingClick} className="w-full mt-3" variant={"secondary"}>
            Reservar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BarbershopItem;
