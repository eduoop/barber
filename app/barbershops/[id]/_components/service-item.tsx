"use client";

import { Button } from "@/app/_components/ui/button";
import { Calendar } from "@/app/_components/ui/calendar";
import { Card, CardContent } from "@/app/_components/ui/card";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/_components/ui/sheet";
import { Barbershop, Booking, Service } from "@prisma/client";
import { ptBR } from "date-fns/locale/pt-BR";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { generateDayTimeList } from "../_helpers/hours";
import { useMemo, useState, useEffect } from "react";
import { format } from "date-fns/format";
import { SaveBooking } from "../_actions/save-booking";
import { setHours, setMinutes } from "date-fns";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { GetDayBookings } from "../_actions/get-day-bookings";
interface ServiceItemProps {
  service: Service;
  barberShop: Barbershop;
  isAuthenticated?: boolean;
}

const ServiceItem = ({
  service,
  isAuthenticated,
  barberShop,
}: ServiceItemProps) => {
  const { data } = useSession();
  const router = useRouter();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [hour, setHour] = useState<string | undefined>(undefined);
  const [submitIsLoading, setSubmitIsLoading] = useState(false);
  const [sheetIsOpen, setSheetIsOpen] = useState(false);
  const [dayBookings, setDayBookings] = useState<Booking[]>([]);

  useEffect(() => {
    if (!date) {
      return;
    }

    const refreshAvailableHours = async () => {
      const _dayBookings = await GetDayBookings({
        barbershopId: barberShop.id, date
      });
      setDayBookings(_dayBookings);
    };

    refreshAvailableHours();
  }, [date, barberShop.id]);

  const handleBookingClick = () => {
    if (!isAuthenticated) {
      return signIn();
    }
  };

  const handleBookingSubmit = async () => {
    setSubmitIsLoading(true);

    if (!hour || !date || !data?.user) {
      return;
    }

    const dateHour = Number(hour.split(":")[0]);
    const dateMinutes = Number(hour.split(":")[1]);

    const newDate = setMinutes(setHours(date, dateHour), dateMinutes);

    try {
      await SaveBooking({
        serviceId: service.id,
        barbershopId: barberShop.id,
        date: newDate,
        userId: (data.user as any).id,
      });

      setSheetIsOpen(false);
      setHour(undefined);
      setDate(undefined);

      toast("Reserva realizada com sucesso!", {
        description: format(newDate, "'Para' dd 'de' MMMM 'às' HH':'mm'.'", {
          locale: ptBR,
        }),
        action: {
          label: "Visualizar",
          onClick: () => router.push("/bookings"),
        },
      });
    } catch (err) {
      console.log(err);
      alert(
        "Não foi possível realizar o agendamento! Tente novamente mais tarde"
      );
      setSheetIsOpen(false);
      setHour(undefined);
      setDate(undefined);
    } finally {
      setSubmitIsLoading(false);
    }
  };

  const timeList = useMemo(() => {
    setHour(undefined);

    if (!date) {
      return [];
    }

    return generateDayTimeList(date).filter((time) => {

      const timeHour = Number(time.split(":")[0]);
      const timeMinutes = Number(time.split(":")[1]);

      const booking = dayBookings.find((booking) => {
        const bookingHour = booking?.date.getHours();
        const bookingMinutes = booking?.date.getMinutes();

        return bookingHour === timeHour && bookingMinutes === timeMinutes;
      });

      if (!booking) {
        return true;
      }

      return false
    });
  }, [date, dayBookings]);

  const handleHourClick = (time: string) => {
    setHour(time);
  };

  const submitDisabled = !date || !hour || submitIsLoading;

  return (
    <Card>
      <CardContent className="p-3">
        <div className="flex gap-4 items-center">
          <div className="relative min-h-[110px] min-w-[110px] max-h-[110px]">
            <Image
              src={service.imageUrl}
              alt={service.name}
              fill
              className="object-contain rounded-lg"
            />
          </div>

          <div className="flex flex-col w-full">
            <h2 className="font-bold">{service.name}</h2>
            <p className="text-sm text-gray-400">{service.description}</p>

            <div className="flex items-center justify-between mt-3">
              <p className="text-primary font-bold text-sm">
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(service.price))}
              </p>
              <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
                <SheetTrigger asChild>
                  <Button variant={"secondary"} onClick={handleBookingClick}>
                    Fazer reserva
                  </Button>
                </SheetTrigger>

                <SheetContent className="p-0">
                  <SheetHeader className="text-left px-5 py-6 border-b border-solid border-secondary">
                    <SheetTitle>Agendar</SheetTitle>
                  </SheetHeader>

                  <div className="py-6 w-full">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      locale={ptBR}
                      className="w-full"
                      fromDate={new Date()}
                      styles={{
                        head_cell: {
                          width: "100%",
                          textTransform: "capitalize",
                        },
                        cell: {
                          width: "100%",
                        },
                        button: {
                          width: "100%",
                        },
                        nav_button_previous: {
                          width: "32px",
                          height: "32px",
                        },
                        nav_button_next: {
                          width: "32px",
                          height: "32px",
                        },
                        caption: {
                          textTransform: "capitalize",
                        },
                      }}
                    />
                  </div>

                  {date && (
                    <div className="py-6 px-5 border-t border-solid border-secondary flex overflow-x-auto [&::-webkit-scrollbar]:hidden gap-3">
                      {timeList.map((time, i) => (
                        <Button
                          onClick={() => handleHourClick(time)}
                          variant={hour === time ? "default" : "outline"}
                          className="rounded-full"
                          key={time + i}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  )}

                  <div className="py-6 px-5 border-t border-solid border-secondary">
                    <Card>
                      <CardContent className="p-3 flex flex-col gap-3">
                        <div className="flex justify-between">
                          <h2 className="font-bold">{service.name}</h2>
                          <h3 className="font-bold text-sm">
                            {" "}
                            {Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(Number(service.price))}
                          </h3>
                        </div>

                        {date && (
                          <div className="flex justify-between">
                            <h3 className="text-sm text-gray-400">Data</h3>
                            <h4 className="text-sm text-gray-400">
                              {format(date, "dd 'de' MMMM", {
                                locale: ptBR,
                              })}
                            </h4>
                          </div>
                        )}

                        {hour && (
                          <div className="flex justify-between">
                            <h3 className="text-sm text-gray-400 ">Horário</h3>
                            <h4 className="text-sm text-gray-400">{hour}</h4>
                          </div>
                        )}

                        {barberShop && (
                          <div className="flex justify-between">
                            <h3 className="text-sm text-gray-400 ">
                              Barbearia
                            </h3>
                            <h4 className="text-sm text-gray-400">
                              {barberShop.name}
                            </h4>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>

                  <SheetFooter className="px-5">
                    <Button
                      onClick={handleBookingSubmit}
                      disabled={submitDisabled}
                    >
                      {submitIsLoading && (
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      )}
                      Confirmar
                    </Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceItem;
