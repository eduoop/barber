"use client";

import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Prisma } from "@prisma/client";
import { format, isPast } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import Image from "next/image";
import { Button } from "./ui/button";
import { CancelBooking } from "../_actions/cancel-booking";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: true;
      barbershop: true;
    };
  }>;
}

const BookingItem = ({ booking }: BookingItemProps) => {
  const pastBooking = isPast(booking.date);

  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const handleCancelBooking = () => {
    setIsDeleteLoading(true);
    try {
      CancelBooking(booking.id);
      toast.success("Reserva cancelada com sucesso");
    } catch (err) {
      console.log(err);
    } finally {
      setIsDeleteLoading(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Card className="hover:bg-accent duration-150 cursor-pointer min-w-full ">
          <CardContent className="py-0 flex px-0">
            <div className="flex flex-col gap-2 py-5 flex-[3] pl-5">
              <Badge
                variant={pastBooking ? "secondary" : "default"}
                className="font-semibold w-fit "
              >
                {pastBooking ? "Finalizado" : "Confirmado"}
              </Badge>
              <h2 className="font-bold">{booking.service.name}</h2>

              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={booking.barbershop.imageUrl} />

                  <AvatarFallback>
                    {booking.barbershop.name.split("")[0]}
                  </AvatarFallback>
                </Avatar>

                <h3 className="text-sm">{booking.barbershop.name}</h3>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center border-l border-solid border-secondary md:flex-1 flex-[1.4]">
              <p className="text-sm capitalize">
                {format(booking.date, "MMMM", {
                  locale: ptBR,
                })}
              </p>
              <p className="text-2xl">
                {format(booking.date, "dd", {
                  locale: ptBR,
                })}
              </p>
              <p className="text-sm">
                {format(booking.date, "hh:mm", {
                  locale: ptBR,
                })}
              </p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>

      <SheetContent className="px-0 overflow-y-auto w-[85%] md:w-[75%]">
        <SheetHeader className="text-left px-5 pb-6 border-b border-solid border-secondary">
          <SheetTitle>Informações da reserva</SheetTitle>
        </SheetHeader>

        <div className="px-5">
          <div className="relative h-[180px] w-full mt-6">
            <Image src="/map.png" fill alt={booking.service.name} />

            <div className="w-full absolute bottom-4 left-0 px-2 md:px-5">
              <Card>
                <CardContent className="p-3 flex gap-2">
                  <Avatar>
                    <AvatarImage src={booking.barbershop.imageUrl} />
                  </Avatar>

                  <div>
                    <h2 className="font-bold">{booking.barbershop.name}</h2>
                    <h3 className="text-xs overflow-hidden text-ellipsis">
                      {booking.barbershop.address}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Badge
            variant={pastBooking ? "secondary" : "default"}
            className="font-semibold w-fit my-3"
          >
            {pastBooking ? "Finalizado" : "Confirmado"}
          </Badge>

          <Card>
            <CardContent className="p-3 flex flex-col gap-3">
              <div className="flex justify-between">
                <h2 className="font-bold">{booking.service.name}</h2>
                <h3 className="font-bold text-sm">
                  {" "}
                  {Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(booking.service.price))}
                </h3>
              </div>

              <div className="flex justify-between">
                <h3 className="text-sm text-gray-400">Data</h3>
                <h4 className="text-sm text-gray-400">
                  {format(booking.date, "dd 'de' MMMM", {
                    locale: ptBR,
                  })}
                </h4>
              </div>

              <div className="flex justify-between">
                <h3 className="text-sm text-gray-400 ">Horário</h3>
                <h4 className="text-sm text-gray-400">
                  {format(booking.date, "hh:mm", {
                    locale: ptBR,
                  })}
                </h4>
              </div>

              {booking.barbershop && (
                <div className="flex justify-between">
                  <h3 className="text-sm text-gray-400 ">Barbearia</h3>
                  <h4 className="text-sm text-gray-400 text-right">
                    {booking.barbershop.name}
                  </h4>
                </div>
              )}
            </CardContent>
          </Card>

          <SheetFooter className="flex-col md:flex-row w-full gap-3 mt-6 pb-5">
            <SheetClose asChild>
              <Button className="w-full" variant={"secondary"}>
                Voltar
              </Button>
            </SheetClose>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                {!pastBooking && (
                  <Button
                    disabled={isDeleteLoading}
                    className="w-full"
                    variant={"destructive"}
                  >
                    Cancelar reserva
                  </Button>
                )}
              </AlertDialogTrigger>
              <AlertDialogContent className="w-[90%]">
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Deseja mesmo cancelar essa reserva?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Uma vez cancelada, não será mais possível reverter essa
                    ação!
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter className="flex-row gap-3">
                  <AlertDialogCancel className="w-full mt-0">
                    Voltar
                  </AlertDialogCancel>
                  <AlertDialogAction
                    disabled={isDeleteLoading}
                    onClick={handleCancelBooking}
                    className="w-full"
                  >
                    {isDeleteLoading && (
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    )}
                    Confirmar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BookingItem;
