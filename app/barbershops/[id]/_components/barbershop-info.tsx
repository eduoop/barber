"use client";
import SideMenu from "@/app/_components/side-menu";
import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
import { db } from "@/app/_lib/prisma";
import { Barbershop } from "@prisma/client";
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
import { useRouter } from "next/navigation";
import React from "react";

interface BarbershopInfoProps {
  barbershop: Barbershop;
}

const BarbershopInfo = ({ barbershop }: BarbershopInfoProps) => {
  const navigate = useRouter();

  const handleBackClick = () => {
    navigate.replace("/");
  };

  return (
    <div>
      <div className="h-[250px] w-full relative">
        <Button
          size={"icon"}
          variant={"outline"}
          className="z-50 top-4 left-4 absolute"
          onClick={handleBackClick}
        >
          <ChevronLeftIcon />
        </Button>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              size={"icon"}
              variant={"outline"}
              className="z-50 top-4 right-4 absolute"
            >
              <MenuIcon />
            </Button>
          </SheetTrigger>

          <SideMenu />
        </Sheet>

        <Image
          alt={barbershop.name}
          src={barbershop.imageUrl}
          fill
          className="object-cover opacity-75"
        ></Image>
      </div>

      <div className="px-5 pt-3 pb-6 border-solid border-b border-secondary">
        <h1 className="text-xl font-bold">{barbershop.name}</h1>

        <div className="flex items-center gap-1 mt-2">
          <MapPinIcon className="text-primary" size={18} />
          <p className="text-sm">{barbershop.address}</p>
        </div>

        <div className="flex items-center gap-1 mt-2">
          <StarIcon className="text-primary" size={18} />
          <p className="text-sm">5,0 (253 avaliações)</p>
        </div>
      </div>
    </div>
  );
};

export default BarbershopInfo;
