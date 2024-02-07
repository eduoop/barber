import React from 'react'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Booking, Prisma } from '@prisma/client'
import { format, isPast } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface BookingItemProps {
    booking: Prisma.BookingGetPayload<{
        include: {
            service: true,
            barbershop: true,
        }
    }>
}

const BookingItem = ({ booking }: BookingItemProps) => {

    const pastBooking = isPast(booking.date)

  return (
    <Card className='hover:bg-accent duration-150 cursor-pointer min-w-full '>
        <CardContent className='py-0 flex px-0'>
            <div className='flex flex-col gap-2 py-5 flex-[3] pl-5'>
                <Badge variant={
                    pastBooking  ? "secondary" : "default"
                } className='font-semibold w-fit '>
                    {pastBooking ? "Finalizado" : "Confirmado"}
                </Badge>
                <h2 className='font-bold'>{booking.service.name}</h2>

                <div className="flex items-center gap-2">
                    <Avatar className='h-6 w-6'>
                        <AvatarImage src={booking.barbershop.imageUrl}/>

                        <AvatarFallback>{booking.barbershop.name.split("")[0]}</AvatarFallback>
                    </Avatar>

                    <h3 className='text-sm'>{booking.barbershop.name}</h3>
                </div>
            </div>

            <div className='flex flex-col items-center justify-center border-l border-solid border-secondary flex-1'>
                <p className='text-sm capitalize'>{format(booking.date, "MMMM", {
                    locale: ptBR
                })}</p>
                <p className='text-2xl'>{format(booking.date, "dd", {
                    locale: ptBR
                })}</p>
                <p className='text-sm'>{format(booking.date, "hh:mm", {
                    locale: ptBR
                })}</p>
            </div>
        </CardContent>
    </Card>
  )
}

export default BookingItem