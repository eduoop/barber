"use server"

import { db } from '@/app/_lib/prisma'
import { endOfDay } from 'date-fns/endOfDay'
import { startOfDay } from 'date-fns/startOfDay'

interface GetDayBookingsProps {
    date: Date
    barbershopId: string
}

export const GetDayBookings = async ({ barbershopId, date}: GetDayBookingsProps) => {
    const bookings = await db.booking.findMany({
        where: {
            barbershopId,
            date: {
             lte: endOfDay(date),
             gte: startOfDay(date),
            },
        }
    })

    return bookings
}
