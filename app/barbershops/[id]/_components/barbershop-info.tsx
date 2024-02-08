"use client";
import SideMenu from "@/app/_components/side-menu";
import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
import { db } from "@/app/_lib/prisma";
import { Barbershop, Prisma } from "@prisma/client";
import {
  ChevronLeftIcon,
  Loader2,
  LocateFixed,
  LocateIcon,
  MapPin,
  MapPinIcon,
  MenuIcon,
  StarIcon,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { toggleFavoriteBarbershop } from "../_actions/toggle-favorite-barbershop";
import { useSession } from "next-auth/react";
import { isFavoriteBarbershop } from "../../../_helpers/isFavoriteBarbership";

interface BarbershopInfoProps {
  barbershop: Prisma.BarbershopGetPayload<{
    include: {
      UserFavoriteBarbershop: true;
    };
  }>;
}

const BarbershopInfo = ({ barbershop }: BarbershopInfoProps) => {
  const navigate = useRouter();
  const { data } = useSession();
  const [isFavorite, setIsFavorite] = useState(false);
  const [loadingToggleFavorite, setLoadingToggleFavorite] = useState(false);
  const handleBackClick = () => {
    navigate.replace("/");
  };

  const handleFavoriteBarbershop = async () => {
    if (data?.user) {
      setLoadingToggleFavorite(true);
      try {
        await toggleFavoriteBarbershop((data.user as any).id, barbershop.id);
      } catch (err) {
        console.log(err);
      } finally {
        setLoadingToggleFavorite(false);
      }
    }
  };

  useMemo(() => {
    if (data?.user) {
      setIsFavorite(
        isFavoriteBarbershop(
          barbershop.UserFavoriteBarbershop,
          (data.user as any).id
        )
      );
    }
  }, [data?.user, barbershop.UserFavoriteBarbershop]);

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
          <p className="text-sm">
            {barbershop.UserFavoriteBarbershop.length} favoritos
          </p>
        </div>

        <Button
          disabled={loadingToggleFavorite}
          onClick={handleFavoriteBarbershop}
          className="mt-4"
          variant={"secondary"}
        >
          {loadingToggleFavorite ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <StarIcon className="h-5 w-5 mr-2" />
          )}
          {isFavorite ? "Remover dos favoritos" : "Favoritar"}
        </Button>
      </div>
    </div>
  );
};

export default BarbershopInfo;
